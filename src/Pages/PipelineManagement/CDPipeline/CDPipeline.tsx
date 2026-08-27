import './CDPipeline.css';

import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiGlobe, FiPackage, FiServer, FiTag } from 'react-icons/fi';
import { SiGithubactions, SiReact } from 'react-icons/si';
import { TbGitBranch } from 'react-icons/tb';

import {
	Button,
	Card,
	TextField,
	Typography,
} from '../../../common/components';

import type {CDPipelineProps, GeneratedPipelineView} from '../interfaces';

const CONFIG_FIELDS = [
    {
        key: 'targetEnvironment',
        label: 'Target Environment',
        placeholder: 'Production',
        icon: <FiGlobe size={16} color='#2563eb' />,
        optional: false,
    },
    {
        key: 'techStack',
        label: 'Tech Stack',
        placeholder: 'React',
        icon: <SiReact size={16} color='#61dafb' />,
        optional: false,
    },
    {
        key: 'version',
        label: 'Version',
        placeholder: '18.x',
        icon: <FiTag size={16} color='#b9ea08' />,
        optional: false,
    },
    {
        key: 'repoName',
        label: 'Repo Name',
        placeholder: 'react-app',
        icon: <FaGithub size={16} color='#111827' />,
        optional: false,
    },
    {
        key: 'resourceGroup',
        label: 'Resource Group Name',
        placeholder: 'my-resource-group',
        icon: <FiServer size={16} color='#850bdc' />,
        optional: false,
    },
    {
        key: 'deploymentTargetName',
        label: 'Deployment Target Name',
        placeholder: 'aks-cluster-prod',
        icon: <FiServer size={16} color='#36ea0e' />,
        optional: false,
    },
    {
        key: 'ciTool',
        label: 'CI Tool',
        placeholder: 'GitHub Actions',
        icon: <SiGithubactions size={16} color='#2563eb' />,
        optional: false,
    },
    {
        key: 'branchName',
        label: 'Branch Name',
        placeholder: 'main',
        icon: <TbGitBranch size={16} color='#6b7280' />,
        optional: false,
    },
    {
        key: 'artifactName',
        label: 'Artifact Name',
        placeholder: 'my-app-artifact',
        icon: <FiPackage size={16} color='#d83a1b' />,
        optional: true,
    },
    {
        key: 'workflowName',
        label: 'Workflow Name',
        placeholder: 'cd-workflow',
        icon: <SiGithubactions size={16} color='#022523' />,
        optional: true,
    },
    {
        key: 'ciPipelineName',
        label: 'CI Pipeline Name',
        placeholder: 'ci-pipeline',
        icon: <SiGithubactions size={16} color='#c3ec0c' />,
        optional: true,
    },
];

const highlightYaml = (line: string) => {
    if (!line.trim()) return <span>&nbsp;</span>;

    const kvMatch = line.match(/^((\s*)([-]?\s*)([\w-]+)(:\s*)(.*))$/);
    if (kvMatch) {
        const [, , indent, dash, key, colon, value] = kvMatch;
        return (
            <>
                <span>{indent}</span>
                {dash && <span style={{color: '#6b7280'}}>{dash}</span>}
                <span style={{color: '#2563eb'}}>{key}</span>
                <span style={{color: '#374151'}}>{colon}</span>
                {value && (
                    <span
                        style={{
                            color:
                                value.startsWith("'") || value.startsWith('"')
                                    ? '#16a34a'
                                    : '#111827',
                        }}
                    >
                        {value}
                    </span>
                )}
            </>
        );
    }

    return <span>{line}</span>;
};

const getGeneratedPipelineView = (data: any): GeneratedPipelineView => {
    const response = data?.generatedPipeline ?? data ?? {};
    const contentCandidate =
        response['TASK COMPLETED'] ??
        response['Task Completed'] ??
        response['task completed'] ??
        response.content ??
        response.yaml ??
        response.pipeline;

    const content = Array.isArray(contentCandidate)
        ? contentCandidate.filter((item) => typeof item === 'string').join('\n')
        : typeof contentCandidate === 'string'
          ? contentCandidate
          : '';

    return {
        filename:
            typeof response.filename === 'string'
                ? response.filename
                : 'cd-pipeline.yml',
        content,
    };
};

const getGeneratedNote = (data: any) =>
    data?.Note ?? data?.note ?? data?.NOTE ?? null;

const CDPipeline = ({
    data,
    baseData,
    fieldValues,
    setFieldValues,
    generating = false,
}: CDPipelineProps) => {
    const pipeline = data?.cdPipeline;
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!pipeline) return null;

    const handleChange = (
        key: string,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const val = e.target.value;
        setFieldValues((prev) => ({...prev, [key]: val}));
        if (
            touched[key] &&
            !CONFIG_FIELDS.find((f) => f.key === key)?.optional
        ) {
            setErrors((prev) => ({
                ...prev,
                [key]: val.trim() ? '' : 'This field is required',
            }));
        }
    };

    const handleBlur = (key: string, optional: boolean) => {
        setTouched((prev) => ({...prev, [key]: true}));
        if (!optional) {
            setErrors((prev) => ({
                ...prev,
                [key]: (fieldValues[key] ?? '').trim()
                    ? ''
                    : 'This field is required',
            }));
        }
    };

    const generatedPipeline = getGeneratedPipelineView(pipeline);
    const generatedNote = getGeneratedNote(pipeline);
    const noteLines =
        typeof generatedNote === 'string' ? generatedNote.split('\n') : [];

    const summary = baseData?.summary ?? pipeline?.summary ?? {};
    const hasPipelineSummary = Object.keys(summary).length > 0;
    const hasStages =
        Array.isArray(summary.stages) && summary.stages.length > 0;

    return (
        <div className='cd-pipeline-grid'>
            <div className='cd-pipeline-config card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Pipeline Configuration</Typography>
                    {CONFIG_FIELDS.map((field) => (
                        <div key={field.key} className='cd-config-field'>
                            <TextField
                                label={field.label}
                                value={fieldValues[field.key] || ''}
                                placeholder={field.placeholder}
                                variant='outlined'
                                size='sm'
                                startDecorator={field.icon}
                                hasError={Boolean(
                                    touched[field.key] && errors[field.key],
                                )}
                                errorMessage={
                                    touched[field.key]
                                        ? errors[field.key] || ''
                                        : ''
                                }
                                onChange={(e) => handleChange(field.key, e)}
                                onBlur={() =>
                                    handleBlur(field.key, field.optional)
                                }
                            />
                        </div>
                    ))}
                </Card>
            </div>

            <main className='cd-pipeline-main card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Generated CD Pipeline</Typography>

                    {!generating && generatedPipeline.content && (
                        <div className='cd-pipeline-file-bar'>
                            <div className='cd-pipeline-file-name'>
                                <svg
                                    width='16'
                                    height='16'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='#2563eb'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                                    <polyline points='14 2 14 8 20 8' />
                                </svg>
                                <span>{generatedPipeline.filename}</span>
                            </div>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                ariaLabel='Copy'
                            >
                                Copy
                            </Button>
                        </div>
                    )}

                    <div className='cd-pipeline-code-wrap'>
                        {generating ? (
                            <div className='cd-pipeline-loading-state'>
                                <Typography variant='h4'>
                                    Loading response...
                                </Typography>
                                <Typography variant='body2' color='muted'>
                                    Please wait while we fetch the generated
                                    pipeline from the backend.
                                </Typography>
                            </div>
                        ) : (
                            <>
                                <div className='cd-pipeline-line-nums'>
                                    {(generatedPipeline.content || '')
                                        .split('\n')
                                        .map((_: string, index: number) => (
                                            <span key={index}>{index + 1}</span>
                                        ))}
                                </div>
                                <pre className='cd-pipeline-code'>
                                    {(generatedPipeline.content || '')
                                        .split('\n')
                                        .map((line: string, index: number) => (
                                            <div
                                                key={index}
                                                className='cd-code-line'
                                            >
                                                {highlightYaml(line)}
                                            </div>
                                        ))}
                                </pre>
                            </>
                        )}
                    </div>
                </Card>

                <div className='cd-pipeline-note-section'>
                    <div className='cd-pipeline-note-box'>
                        <Typography
                            variant='h4'
                            className='cd-pipeline-note-title'
                        >
                            Note
                        </Typography>
                        {generating ? (
                            <Typography variant='body2' color='muted'>
                                Waiting for note response from backend...
                            </Typography>
                        ) : generatedNote ? (
                            noteLines.map((line, i) => (
                                <Typography
                                    key={`${line}-${i}`}
                                    variant='body2'
                                    className='cd-pipeline-note-line'
                                >
                                    {line || '\u00A0'}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant='body2' color='muted'>
                                No note was returned by the backend response.
                            </Typography>
                        )}
                    </div>
                </div>

                <div className='cd-generated-actions'>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        ariaLabel='Download'
                    >
                        Download
                    </Button>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        ariaLabel='Save Pipeline'
                    >
                        Save Pipeline
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        ariaLabel='Commit to GitHub'
                        startIcon={<FaGithub size={14} />}
                    >
                        Commit to GitHub
                    </Button>
                </div>
            </main>

            <div className='cd-pipeline-summary card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Pipeline Summary</Typography>
                    {hasPipelineSummary ? (
                        <div className='summary-list'>
                            <div className='summary-item'>
                                <div className='summary-icon summary-icon--accent'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M4 20V7l8-4 8 4v13' />
                                        <path d='M8 10h8' />
                                        <path d='M8 14h8' />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Environments
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary?.environments ?? ''}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <circle cx='12' cy='12' r='10' />
                                        <line x1='12' y1='8' x2='12' y2='12' />
                                        <line
                                            x1='12'
                                            y1='16'
                                            x2='12.01'
                                            y2='16'
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Deployment Target
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary?.deploymentTarget ?? ''}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <polyline points='16 3 21 3 21 8' />
                                        <line x1='4' y1='20' x2='21' y2='3' />
                                        <polyline points='21 16 21 21 16 21' />
                                        <line x1='15' y1='15' x2='21' y2='21' />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Strategy
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary?.strategy ?? ''}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon summary-icon--accent'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <polyline points='20 6 9 17 4 12' />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Approval Required
                                    </Typography>
                                    <Typography variant='h5'>
                                        {String(
                                            summary?.approvalRequired ?? '',
                                        )}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <circle cx='12' cy='12' r='10' />
                                        <polyline points='12 6 12 12 16 14' />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Estimated Duration
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary?.estimatedDuration ?? ''}
                                    </Typography>
                                </div>
                            </div>

                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M3 12h5l2 4 5-10 2 6h4' />
                                        <path d='M19 6l2 2-2 2' />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Rollback on Failure
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary?.rollbackOnFailure ?? ''}
                                    </Typography>
                                </div>
                            </div>

                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <svg
                                        width='18'
                                        height='18'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path d='M4 18h16' />
                                        <path d='M7 15l3-3 3 2 4-6' />
                                        <path d='M17 8h2v2' />
                                    </svg>
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Post Deployment Tests
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary?.postDeploymentTests ?? ''}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Typography variant='body2' color='muted'>
                            The backend response does not include a summary
                            block.
                        </Typography>
                    )}
                </Card>

                <Card
                    variant='outlined-raised'
                    size='lg'
                    className='cd-stages-overview-card'
                >
                    <Typography variant='h3'>Stages Overview</Typography>
                    {hasStages ? (
                        <div className='cd-stages-list'>
                            {(summary?.stages ?? []).map(
                                (stage: any, index: number) => {
                                    const isDone = stage?.done === true;
                                    const isPending =
                                        stage?.done === 'pending' ||
                                        stage?.done === false;

                                    return (
                                        <div
                                            key={`${stage?.name ?? 'stage'}-${index}`}
                                            className='cd-stage-item'
                                        >
                                            <div className='cd-stage-number'>
                                                {index + 1}
                                            </div>
                                            <div className='cd-stage-copy'>
                                                <Typography variant='h5'>
                                                    {stage?.name ??
                                                        `Stage ${index + 1}`}
                                                </Typography>
                                            </div>
                                            <div
                                                className={`cd-stage-state ${
                                                    isDone
                                                        ? 'success'
                                                        : isPending
                                                          ? 'warning'
                                                          : 'neutral'
                                                }`}
                                            >
                                                {isDone ? (
                                                    <svg
                                                        viewBox='0 0 24 24'
                                                        aria-hidden='true'
                                                    >
                                                        <path
                                                            d='M6 12.5L10.2 16.7L18 8.9'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='2.2'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        viewBox='0 0 24 24'
                                                        aria-hidden='true'
                                                    >
                                                        <circle
                                                            cx='12'
                                                            cy='12'
                                                            r='7'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='1.8'
                                                        />
                                                        <path
                                                            d='M12 8V12L14.8 14.2'
                                                            fill='none'
                                                            stroke='currentColor'
                                                            strokeWidth='1.8'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    ) : (
                        <Typography variant='body2' color='muted'>
                            The backend response does not include a summary
                            block.
                        </Typography>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default CDPipeline;
