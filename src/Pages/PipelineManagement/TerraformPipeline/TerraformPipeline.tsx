import './TerraformPipeline.css';

import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import {
	FiCheckCircle,
	FiClock,
	FiCloud,
	FiCopy,
	FiDownload,
	FiFile,
	FiGitBranch,
	FiGitPullRequest,
	FiLayers,
	FiServer,
	FiShare2,
} from 'react-icons/fi';

import {
	Button,
	Card,
	TextField,
	Typography,
} from '../../../common/components';

import type {
    TerraformPipelineProps,
    GeneratedPipelineView,
} from '../interfaces';

const FIELDS = [
    {
        key: 'cloudProvider',
        label: 'Cloud Provider',
        placeholder: 'AWS / Azure / GCP',
        icon: <FiCloud size={16} color='#2563eb' />,
        multiline: false,
    },
    {
        key: 'resourceGroup',
        label: 'Resource Group Name',
        placeholder: 'my-resource-group',
        icon: <FiServer size={16} color='#e4e80c' />,
        multiline: false,
    },
    {
        key: 'resources',
        label: 'Resources',
        placeholder: 'aws_instance\naws_s3_bucket\naws_vpc',
        icon: <FiLayers size={16} color='#d83a1b' />,
        multiline: true,
    },
    {
        key: 'repoName',
        label: 'Repo Name',
        placeholder: 'terraform-infra',
        icon: <FaGithub size={16} color='#111827' />,
        multiline: false,
    },
    {
        key: 'deployTargetName',
        label: 'Deploy Target Name',
        placeholder: 'aks-cluster-prod',
        icon: <FiServer size={16} color='#36ea0e' />,
        multiline: false,
    },
    {
        key: 'workflowName',
        label: 'Workflow Name',
        placeholder: 'tf-deploy-workflow',
        icon: <FiGitBranch size={16} color='#6b7280' />,
        multiline: false,
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
    const terraformPipeline = data?.terraformPipeline ?? data ?? {};
    const generatedPipeline =
        terraformPipeline.generatedPipeline ?? terraformPipeline;

    if (typeof generatedPipeline === 'string') {
        return {
            filename: 'terraform-pipeline.yml',
            content: generatedPipeline,
        };
    }

    const contentCandidate =
        generatedPipeline['TASK COMPLETED'] ??
        generatedPipeline['Task Completed'] ??
        generatedPipeline['task completed'] ??
        generatedPipeline.content ??
        generatedPipeline.yaml ??
        generatedPipeline.pipeline ??
        generatedPipeline.response ??
        generatedPipeline.result ??
        generatedPipeline.data ??
        generatedPipeline.name;

    const filenameCandidate =
        generatedPipeline.filename ?? generatedPipeline.file_name;
    const filename =
        typeof filenameCandidate === 'string' &&
        /\.(yml|yaml)$/i.test(filenameCandidate)
            ? filenameCandidate
            : 'terraform-pipeline.yml';

    const content = Array.isArray(contentCandidate)
        ? contentCandidate.filter((item) => typeof item === 'string').join('\n')
        : typeof contentCandidate === 'string'
          ? contentCandidate
          : '';

    return {
        filename,
        content,
    };
};

const getGeneratedNote = (data: any) =>
    data?.Note ?? data?.note ?? data?.NOTE ?? null;

const TerraformPipeline = ({
    data,
    baseData,
    fieldValues,
    setFieldValues,
    generating = false,
}: TerraformPipelineProps) => {
    const tf = data?.terraformPipeline ?? data ?? {};
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const generatedPipeline = getGeneratedPipelineView(data);
    const generatedNote = getGeneratedNote(tf);
    const summary = baseData?.summary ?? tf?.summary ?? {};
    const recentPipelines =
        baseData?.recentPipelines ?? tf?.recentPipelines ?? [];
    const hasRecentPipelines =
        Array.isArray(recentPipelines) && recentPipelines.length > 0;

    const handleChange = (key: string, val: string) => {
        setFieldValues((prev) => ({...prev, [key]: val}));
        if (touched[key]) {
            setErrors((prev) => ({
                ...prev,
                [key]: val.trim() ? '' : 'This field is required',
            }));
        }
    };

    const handleBlur = (key: string) => {
        setTouched((prev) => ({...prev, [key]: true}));
        setErrors((prev) => ({
            ...prev,
            [key]: (fieldValues[key] ?? '').trim()
                ? ''
                : 'This field is required',
        }));
    };

    return (
        <div className='tf-pipeline-layout'>
            <div className='tf-card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Pipeline Configuration</Typography>
                    {FIELDS.map(
                        ({key, label, placeholder, icon, multiline}) => (
                            <div key={key} className='tf-config-field'>
                                <TextField
                                    label={label}
                                    value={fieldValues[key] ?? ''}
                                    placeholder={placeholder}
                                    variant='outlined'
                                    size='sm'
                                    startDecorator={icon}
                                    multiline={multiline}
                                    rows={multiline ? 5 : undefined}
                                    hasError={Boolean(
                                        touched[key] && errors[key],
                                    )}
                                    errorMessage={
                                        touched[key] ? (errors[key] ?? '') : ''
                                    }
                                    onChange={(e) =>
                                        handleChange(key, e.target.value)
                                    }
                                    onBlur={() => handleBlur(key)}
                                />
                            </div>
                        ),
                    )}
                </Card>
            </div>

            <div className='tf-card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Generated TF Pipeline</Typography>
                    {!generating && generatedPipeline.content && (
                        <div className='tf-file-bar'>
                            <div className='tf-file-name'>
                                <FiFile size={16} color='#2563eb' />
                                <span>{generatedPipeline.filename}</span>
                            </div>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='small'
                                ariaLabel='Copy'
                            >
                                <FiCopy size={14} style={{marginRight: 4}} />
                                Copy
                            </Button>
                        </div>
                    )}

                    <div className='tf-code-wrap'>
                        {generating ? (
                            <div className='tf-pipeline-loading-state'>
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
                                <div className='tf-line-nums'>
                                    {generatedPipeline.content
                                        .split('\n')
                                        .map((_: string, index: number) => (
                                            <span key={index}>{index + 1}</span>
                                        ))}
                                </div>
                                <pre className='tf-code-block'>
                                    {generatedPipeline.content
                                        .split('\n')
                                        .map((line: string, index: number) => (
                                            <div
                                                key={index}
                                                className='tf-code-line'
                                            >
                                                {highlightYaml(line)}
                                            </div>
                                        ))}
                                </pre>
                            </>
                        )}
                    </div>
                </Card>

                <div className='tf-note-section'>
                    <div className='tf-note-box'>
                        <Typography variant='h4' className='tf-note-title'>
                            Note
                        </Typography>
                        {generatedNote ? (
                            <Typography variant='body2' color='muted'>
                                {generatedNote}
                            </Typography>
                        ) : (
                            <Typography variant='body2' color='muted'>
                                No note was returned by the backend response.
                            </Typography>
                        )}
                    </div>
                </div>

                <div className='tf-actions'>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        ariaLabel='Download'
                        startIcon={<FiDownload size={14} />}
                    >
                        Download
                    </Button>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        ariaLabel='Save Pipeline'
                        startIcon={<FiFile size={14} />}
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
            </div>

            <div className='tf-card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Pipeline Summary</Typography>
                    {Object.keys(summary).length > 0 ? (
                        <div className='tf-summary-list'>
                            <div className='tf-summary-item'>
                                <div className='tf-summary-icon tf-summary-icon--accent'>
                                    <FiShare2 aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Cloud Provider
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary.cloudProvider ?? ''}
                                    </Typography>
                                </div>
                            </div>
                            <div className='tf-summary-item'>
                                <div className='tf-summary-icon'>
                                    <FiGitBranch aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Resources
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary.resources ?? ''}
                                    </Typography>
                                </div>
                            </div>
                            <div className='tf-summary-item'>
                                <div className='tf-summary-icon'>
                                    <FiClock aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Estimated Time
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary.estimatedTime ?? ''}
                                    </Typography>
                                </div>
                            </div>
                            <div className='tf-summary-item'>
                                <div className='tf-summary-icon'>
                                    <FiGitPullRequest aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Triggers
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary.triggers}
                                    </Typography>
                                </div>
                            </div>
                            <div className='tf-summary-item'>
                                <div className='tf-summary-icon tf-summary-icon--accent'>
                                    <FiCheckCircle aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Includes Tests
                                    </Typography>
                                    <Typography variant='h5'>
                                        {summary.includesTests ? 'Yes' : 'No'}
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

                <Card variant='outlined-raised' size='lg'>
                    <div className='tf-recent-header'>
                        <Typography variant='h3'>Recent Pipelines</Typography>
                        <a className='tf-view-all' href='#'>
                            View All
                        </a>
                    </div>
                    {hasRecentPipelines ? (
                        <ul className='tf-recent-list'>
                            {recentPipelines.map((p: any) => (
                                <li key={p.name}>
                                    <Typography variant='body2'>
                                        {p.name}
                                    </Typography>
                                    <Typography variant='caption' color='muted'>
                                        {p.time}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant='body2' color='muted'>
                            No recent pipeline history was returned.
                        </Typography>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default TerraformPipeline;
