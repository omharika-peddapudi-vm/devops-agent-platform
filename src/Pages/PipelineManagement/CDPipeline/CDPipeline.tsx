import './CDPipeline.css';

import {useState} from 'react';
import {FaGithub} from 'react-icons/fa';
import {FiGlobe, FiPackage, FiServer, FiTag} from 'react-icons/fi';
import {SiGithubactions, SiReact} from 'react-icons/si';
import {TbGitBranch} from 'react-icons/tb';

import {Button, Card, TextField, Typography} from '../../../common/components';

type CDPipelineProps = {
    data?: any;
};

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

const CDPipeline = ({data}: CDPipelineProps) => {
    const pipeline = data?.cdPipeline;
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({
        targetEnvironment: pipeline?.targetEnvironment ?? '',
        techStack: pipeline?.techStack ?? '',
        version: pipeline?.version ?? '',
        repoName: pipeline?.repoName ?? '',
        resourceGroup: pipeline?.resourceGroup ?? '',
        deploymentTargetName: pipeline?.deploymentTargetName ?? '',
        ciTool: pipeline?.ciTool ?? '',
        branchName: pipeline?.branchName ?? '',
        artifactName: pipeline?.artifactName ?? '',
        workflowName: pipeline?.workflowName ?? '',
        ciPipelineName: pipeline?.ciPipelineName ?? '',
    });
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

    return (
        <div className='cd-pipeline-layout'>
            <div className='card-panel cd-pipeline-config'>
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
                            onBlur={() => handleBlur(field.key, field.optional)}
                        />
                    </div>
                ))}
            </div>

            <div className='card-panel cd-pipeline-main'>
                <Typography variant='h3'>Generated CD Pipeline</Typography>
                <div className='cd-file-bar'>
                    <div className='cd-file-name'>
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
                        <span>
                            {pipeline.generatedPipeline?.filename ??
                                'generated-pipeline.yml'}
                        </span>
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

                <div className='cd-code-wrap'>
                    <div className='cd-line-nums'>
                        {(pipeline.generatedPipeline?.content ?? '')
                            .split('\n')
                            .map((_: string, index: number) => (
                                <span key={index}>{index + 1}</span>
                            ))}
                    </div>
                    <pre className='cd-code'>
                        {(pipeline.generatedPipeline?.content ?? '')
                            .split('\n')
                            .map((line: string, index: number) => (
                                <div key={index} className='cd-code-line'>
                                    {line || ' '}
                                </div>
                            ))}
                    </pre>
                </div>

                <div className='cd-action-bar'>
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
            </div>

            <div className='card-panel cd-summary'>
                <Typography variant='h3'>Pipeline Summary</Typography>
                <div className='cd-sum-list'>
                    <div className='cd-sum-item'>
                        <div className='cd-sum-icon cd-sum-icon--green'>
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
                                <rect x='3' y='3' width='7' height='7' />
                                <rect x='14' y='3' width='7' height='7' />
                                <rect x='3' y='14' width='7' height='7' />
                                <rect x='14' y='14' width='7' height='7' />
                            </svg>
                        </div>
                        <div>
                            <Typography variant='caption'>
                                Environments
                            </Typography>
                            <Typography variant='h5'>
                                {pipeline.summary?.environments ?? ''}
                            </Typography>
                        </div>
                    </div>
                    <div className='cd-sum-item'>
                        <div className='cd-sum-icon'>
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
                                <line x1='12' y1='16' x2='12.01' y2='16' />
                            </svg>
                        </div>
                        <div>
                            <Typography variant='caption'>
                                Deployment Target
                            </Typography>
                            <Typography variant='h5'>
                                {pipeline.summary?.deploymentTarget ?? ''}
                            </Typography>
                        </div>
                    </div>
                    <div className='cd-sum-item'>
                        <div className='cd-sum-icon'>
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
                            <Typography variant='caption'>Strategy</Typography>
                            <Typography variant='h5'>
                                {pipeline.summary?.strategy ?? ''}
                            </Typography>
                        </div>
                    </div>
                    <div className='cd-sum-item'>
                        <div className='cd-sum-icon cd-sum-icon--green'>
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
                                    pipeline.summary?.approvalRequired ?? '',
                                )}
                            </Typography>
                        </div>
                    </div>
                    <div className='cd-sum-item'>
                        <div className='cd-sum-icon'>
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
                                {pipeline.summary?.estimatedDuration ?? ''}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CDPipeline;
