import './CIPipeline.css';

import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import {
	FiCheckCircle,
	FiClock,
	FiGitBranch,
	FiGitPullRequest,
	FiPackage,
	FiShare2,
	FiTag,
} from 'react-icons/fi';
import { SiGithubactions, SiReact } from 'react-icons/si';
import { TbGitBranch } from 'react-icons/tb';

import {
	Button,
	Card,
	TextField,
	Typography,
} from '../../../common/components';

import type {CIPipelineProps, GeneratedPipelineView} from '../interfaces';

type GeneratedNoteView = {
    content: string;
};

const CONFIG_FIELDS = [
    {
        key: 'pipelineTool',
        label: 'CI Tool',
        placeholder: 'GitHub Actions',
        icon: <SiGithubactions size={16} color='#2563eb' />,
    },
    {
        key: 'technology',
        label: 'Tech Stack',
        placeholder: 'React',
        icon: <SiReact size={17} color='#61dafb' />,
    },
    {
        key: 'repository',
        label: 'Repo Name',
        placeholder: 'react-app',
        icon: <FaGithub size={17} color='#111827' />,
    },
    {
        key: 'branch',
        label: 'Branch Name',
        placeholder: 'main',
        icon: <TbGitBranch size={17} color='#6b7280' />,
    },
    {
        key: 'nodeVersion',
        label: 'Version',
        placeholder: '18.x',
        icon: <FiTag size={16} color='#b9ea08' />,
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
    const generatedPipeline = data?.generatedPipeline ?? data ?? {};

    if (typeof generatedPipeline === 'string') {
        return {
            filename: 'generated-pipeline.yml',
            content: generatedPipeline,
        };
    }

    const contentCandidate =
        generatedPipeline['TASK COMPLETED'] ??
        generatedPipeline['Task Completed'] ??
        generatedPipeline['task completed'] ??
        generatedPipeline.name ??
        generatedPipeline.content ??
        generatedPipeline.yaml ??
        generatedPipeline.pipeline ??
        generatedPipeline.response ??
        generatedPipeline.result ??
        generatedPipeline.data;

    const filenameCandidate =
        generatedPipeline.filename ?? generatedPipeline.file_name;
    const filename =
        typeof filenameCandidate === 'string' &&
        /\.(yml|yaml)$/i.test(filenameCandidate)
            ? filenameCandidate
            : 'ci-pipeline.yml';

    return {
        filename,
        content:
            typeof contentCandidate === 'string'
                ? contentCandidate
                : typeof generatedPipeline['TASK COMPLETED'] === 'string'
                  ? generatedPipeline['TASK COMPLETED']
                  : typeof generatedPipeline.name === 'string'
                    ? generatedPipeline.name
                    : JSON.stringify(
                          contentCandidate ?? generatedPipeline,
                          null,
                          2,
                      ),
    };
};

const tryParseJson = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

const findNoteValue = (value: unknown): string | null => {
    if (typeof value === 'string') {
        const parsed = tryParseJson(value);
        if (parsed) {
            return findNoteValue(parsed);
        }

        const quotedMatch = value.match(/"Note"\s*:\s*"([^"]+)"/i);
        if (quotedMatch?.[1]) {
            return quotedMatch[1];
        }

        const noteLineMatch = value.match(/Note\s*:\s*(.+)/i);
        if (noteLineMatch?.[1]) {
            return noteLineMatch[1].trim().replace(/^"|"$/g, '');
        }

        return null;
    }

    if (!value || typeof value !== 'object') {
        return null;
    }

    if (Array.isArray(value)) {
        for (const item of value) {
            const found = findNoteValue(item);
            if (found) return found;
        }
        return null;
    }

    for (const [key, child] of Object.entries(
        value as Record<string, unknown>,
    )) {
        if (key.toLowerCase().includes('note')) {
            if (typeof child === 'string') return child;
            const found = findNoteValue(child);
            if (found) return found;
        }

        const found = findNoteValue(child);
        if (found) return found;
    }

    return null;
};

const getGeneratedNoteView = (data: any): GeneratedNoteView | null => {
    const generatedPipeline = data?.generatedPipeline ?? data ?? {};
    const noteContent =
        findNoteValue(generatedPipeline['Note']) ??
        findNoteValue(generatedPipeline['note']) ??
        findNoteValue(generatedPipeline['NOTE']) ??
        findNoteValue(generatedPipeline) ??
        findNoteValue(data) ??
        findNoteValue(generatedPipeline?.content);

    if (!noteContent) {
        return null;
    }

    return {
        content: noteContent,
    };
};

const CIPipeline = ({
    data,
    baseData,
    fieldValues,
    setFieldValues,
    generating = false,
}: CIPipelineProps) => {
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const generatedPipeline = getGeneratedPipelineView(data);
    const generatedNote = getGeneratedNoteView(data);
    const noteLines = generatedNote?.content.split('\n') ?? [];
    const pipelineSummary = baseData?.pipelineSummary ?? data?.pipelineSummary;
    const recentPipelines = baseData?.recentPipelines ?? data?.recentPipelines;
    const hasPipelineSummary = Boolean(pipelineSummary);
    const hasRecentPipelines = Array.isArray(recentPipelines);

    const validateField = (value: string) => {
        if (!value.trim()) {
            return 'This field is required';
        }
        return '';
    };

    const handleFieldChange = (
        key: string,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const nextValue = e.target.value;
        setFieldValues((prev) => ({
            ...prev,
            [key]: nextValue,
        }));

        if (touched[key]) {
            setErrors((prev) => ({
                ...prev,
                [key]: validateField(nextValue),
            }));
        }
    };

    const handleFieldBlur = (key: string) => {
        setTouched((prev) => ({
            ...prev,
            [key]: true,
        }));
        setErrors((prev) => ({
            ...prev,
            [key]: validateField(fieldValues[key] ?? ''),
        }));
    };

    return (
        <div className='pipeline-grid'>
            <div className='pipeline-config card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Pipeline Configuration</Typography>

                    {CONFIG_FIELDS.map(({key, label, icon, placeholder}) => (
                        <div key={key} className='config-field'>
                            <TextField
                                label={label}
                                value={fieldValues[key] ?? ''}
                                placeholder={placeholder}
                                variant='outlined'
                                size='sm'
                                startDecorator={icon}
                                hasError={Boolean(touched[key] && errors[key])}
                                errorMessage={
                                    touched[key] ? (errors[key] ?? '') : ''
                                }
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => handleFieldChange(key, e)}
                                onBlur={() => handleFieldBlur(key)}
                            />
                        </div>
                    ))}
                </Card>
            </div>

            <main className='pipeline-main card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Generated CI Pipeline</Typography>

                    {!generating && generatedPipeline.content && (
                        <div className='pipeline-file-bar'>
                            <div className='pipeline-file-name'>
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
                                <svg
                                    width='14'
                                    height='14'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    style={{marginRight: 4}}
                                >
                                    <rect
                                        x='9'
                                        y='9'
                                        width='13'
                                        height='13'
                                        rx='2'
                                        ry='2'
                                    />
                                    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                                </svg>
                                Copy
                            </Button>
                        </div>
                    )}

                    <div className='pipeline-code-wrap'>
                        {generating ? (
                            <div className='pipeline-loading-state'>
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
                                <div className='pipeline-line-nums'>
                                    {generatedPipeline.content
                                        .split('\n')
                                        .map((_: string, i: number) => (
                                            <span key={i}>{i + 1}</span>
                                        ))}
                                </div>
                                <pre className='pipeline-code'>
                                    {generatedPipeline.content
                                        .split('\n')
                                        .map((line: string, i: number) => (
                                            <div key={i} className='code-line'>
                                                {highlightYaml(line)}
                                            </div>
                                        ))}
                                </pre>
                            </>
                        )}
                    </div>
                </Card>

                <div className='pipeline-note-section'>
                    <div className='pipeline-note-box'>
                        <Typography
                            variant='h4'
                            className='pipeline-note-title'
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
                                    className='pipeline-note-line'
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

                <div className='generated-actions'>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        ariaLabel='Download'
                        startIcon={
                            <svg
                                width='14'
                                height='14'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                                <polyline points='7 10 12 15 17 10' />
                                <line x1='12' y1='15' x2='12' y2='3' />
                            </svg>
                        }
                    >
                        Download
                    </Button>
                    <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        ariaLabel='Save Pipeline'
                        startIcon={
                            <svg
                                width='14'
                                height='14'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
                                <polyline points='14 2 14 8 20 8' />
                            </svg>
                        }
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

            <div className='pipeline-summary card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Pipeline Summary</Typography>
                    {hasPipelineSummary ? (
                        <div className='summary-list'>
                            <div className='summary-item'>
                                <div className='summary-icon summary-icon--accent'>
                                    <FiShare2 aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Stages
                                    </Typography>
                                    <Typography variant='h5'>
                                        {pipelineSummary.stages}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <FiGitBranch aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Jobs
                                    </Typography>
                                    <Typography variant='h5'>
                                        {pipelineSummary.jobs}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <FiClock aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Estimated Time
                                    </Typography>
                                    <Typography variant='h5'>
                                        {pipelineSummary.estimatedTime}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon'>
                                    <FiGitPullRequest aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Triggers
                                    </Typography>
                                    <Typography variant='h5'>
                                        {pipelineSummary.triggers}
                                    </Typography>
                                </div>
                            </div>
                            <div className='summary-item'>
                                <div className='summary-icon summary-icon--accent'>
                                    <FiCheckCircle aria-hidden='true' />
                                </div>
                                <div>
                                    <Typography variant='caption'>
                                        Includes Tests
                                    </Typography>
                                    <Typography variant='h5'>
                                        {pipelineSummary.includesTests
                                            ? 'Yes'
                                            : 'No'}
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
                <div className='recent-pipelines'>
                    <Card variant='outlined-raised' size='lg'>
                        <div className='recent-header'>
                            <Typography variant='h3'>
                                Recent Pipelines
                            </Typography>
                            <a className='view-all' href='#'>
                                View All
                            </a>
                        </div>
                        {hasRecentPipelines ? (
                            <ul>
                                {recentPipelines.map((p: any) => (
                                    <li key={p.name}>
                                        <Typography variant='body2'>
                                            {p.name}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            color='muted'
                                        >
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
        </div>
    );
};

export default CIPipeline;
