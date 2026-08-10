import './WorkflowMonitoring.css';

import React, {useEffect, useState} from 'react';
import {
    BsCheckCircle,
    BsClock,
    BsGrid,
    BsThreeDotsVertical,
    BsXCircle,
} from 'react-icons/bs';
import {FaDocker, FaNode, FaReact} from 'react-icons/fa';
import {TbTestPipe} from 'react-icons/tb';
import {VscAzure, VscCheck} from 'react-icons/vsc';

import {Button, Card, Typography} from '../../common/components';
import {fetchWorkflowMonitoring} from '../../Services/api';

// ─── Types ───────────────────────────────────────────────────────────────────

type SummaryCardData = {
    label: string;
    value: string;
    note: string;
    status?: 'success' | 'running' | 'failed';
};

type WorkflowRow = {
    id: string;
    name: string;
    icon: string;
    repository: string;
    branch: string;
    status: 'Success' | 'Running' | 'Failed';
    triggeredBy: string;
    startedAt: string;
    duration: string;
    initials: string;
};

type Stage = {
    label: string;
    status: 'Success' | 'In Progress' | 'Failed';
};

type WorkflowDetails = {
    title: string;
    state: string;
    stages: Stage[];
    logs: string[];
    runInfo: {
        runId: string;
        triggeredBy: string;
        repository: string;
        branch: string;
        startedAt: string;
        duration: string;
        status: string;
    };
};

type PageData = {
    summaryCards: SummaryCardData[];
    activeWorkflows: WorkflowRow[];
    workflowDetails: WorkflowDetails;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const SummaryCard = ({label, value, note, status}: SummaryCardData) => (
    <Card className='summary-card' variant='outlined-raised' size='sm'>
        <div className='summary-card-body'>
            <div className={`summary-card-icon ${status ?? 'total'}`}>
                {status === 'success' ? (
                    <BsCheckCircle size={24} />
                ) : status === 'running' ? (
                    <BsClock size={24} />
                ) : status === 'failed' ? (
                    <BsXCircle size={24} />
                ) : (
                    <BsGrid size={24} />
                )}
            </div>
            <div className='summary-card-text'>
                <div className='summary-card-label'>{label}</div>
                <div className='summary-card-value'>{value}</div>
                <div className={`summary-card-note ${status ?? ''}`}>
                    {note}
                </div>
            </div>
        </div>
    </Card>
);

const WORKFLOW_ICONS: Record<string, React.ReactNode> = {
    react: <FaReact size={20} color='#61dafb' />,
    azure: <VscAzure size={20} color='#0078d4' />,
    node: <FaNode size={22} color='#68a063' />,
    docker: <FaDocker size={20} color='#2496ed' />,
    test: <TbTestPipe size={20} color='#16a34a' />,
};

const WorkflowTableRow = ({workflow}: {workflow: WorkflowRow}) => (
    <div className='workflow-table-row'>
        <div className='workflow-name-cell'>
            <div className='workflow-icon'>
                {WORKFLOW_ICONS[workflow.icon] ?? <BsGrid size={18} />}
            </div>
            <span className='workflow-name'>{workflow.name}</span>
        </div>
        <div>{workflow.repository}</div>
        <div>{workflow.branch}</div>
        <div>
            <span className={`status-chip ${workflow.status.toLowerCase()}`}>
                {workflow.status}
            </span>
        </div>
        <div className='workflow-triggered-cell'>
            <div
                className={`trigger-avatar ${workflow.initials.toLowerCase()}`}
            >
                {workflow.initials}
            </div>
            <span>{workflow.triggeredBy}</span>
        </div>
        <div>{workflow.startedAt}</div>
        <div>{workflow.duration}</div>
        <Button
            variant='text'
            color='secondary'
            size='small'
            ariaLabel='workflow actions'
        >
            <BsThreeDotsVertical size={16} />
        </Button>
    </div>
);

const StageStep = ({
    label,
    status,
    stepNumber,
}: Stage & {stepNumber: number}) => (
    <div className='stage-step'>
        <div
            className={`stage-circle ${status === 'In Progress' ? 'in-progress' : 'success'}`}
        >
            {status === 'In Progress' ? stepNumber : <VscCheck size={18} />}
        </div>
        <div className='stage-label'>{label}</div>
        <div
            className={`stage-status ${status === 'In Progress' ? 'in-progress' : ''}`}
        >
            {status}
        </div>
    </div>
);

const RunInfoPanel = ({details}: {details: WorkflowDetails}) => (
    <Card className='run-info-panel' variant='outlined-raised' size='lg'>
        <div className='panel-heading'>
            <Typography variant='h3'>Run Information</Typography>
        </div>
        {Object.entries({
            'Run ID': details.runInfo.runId,
            'Triggered By': details.runInfo.triggeredBy,
            Repository: details.runInfo.repository,
            Branch: details.runInfo.branch,
            'Started At': details.runInfo.startedAt,
            Duration: details.runInfo.duration,
        }).map(([label, value]) => (
            <div key={label} className='run-info-row'>
                <span className='run-info-label'>{label}</span>
                <span className='run-info-value'>{value}</span>
            </div>
        ))}
        <div className='run-info-row'>
            <span className='run-info-label'>Status</span>
            <span className='status-chip in-progress'>
                {details.runInfo.status}
            </span>
        </div>
    </Card>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const WorkflowMonitoring = () => {
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchWorkflowMonitoring();
                setData(response as PageData);
            } catch (error) {
                console.error('Failed to load workflow monitoring:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading || !data) {
        return (
            <div className='workflow-page'>
                <Card
                    className='loading-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <Typography variant='h3'>
                        Loading workflow data...
                    </Typography>
                </Card>
            </div>
        );
    }

    const {summaryCards, activeWorkflows, workflowDetails} = data;

    return (
        <div className='workflow-page'>
            <section className='summary-grid'>
                {summaryCards.map((card) => (
                    <SummaryCard key={card.label} {...card} />
                ))}
            </section>

            <Card
                className='workflow-panel'
                variant='outlined-raised'
                size='lg'
            >
                <div className='panel-heading'>
                    <Typography variant='h3'>Active Workflows</Typography>
                    <Button
                        variant='text'
                        color='primary'
                        ariaLabel='View all workflows'
                    >
                        View All Workflows
                    </Button>
                </div>
                <div className='workflow-table-header'>
                    <div>Workflow</div>
                    <div>Repository</div>
                    <div>Branch</div>
                    <div>Status</div>
                    <div>Triggered By</div>
                    <div>Started At</div>
                    <div>Duration</div>
                    <div>Actions</div>
                </div>
                {activeWorkflows.map((wf) => (
                    <WorkflowTableRow key={wf.id} workflow={wf} />
                ))}
            </Card>

            <div className='details-grid'>
                <Card
                    className='details-main'
                    variant='outlined-raised'
                    size='lg'
                >
                    <div className='panel-heading'>
                        <div className='details-heading-row'>
                            <Typography variant='h3'>
                                Workflow Details: {workflowDetails.title}
                            </Typography>
                            <span className='workflow-state-badge'>
                                {workflowDetails.state}
                            </span>
                        </div>
                    </div>
                    <div className='stage-rail-wrapper'>
                        <div className='stage-rail-track' />
                        <div className='stage-rail'>
                            {workflowDetails.stages.map((stage, i) => (
                                <StageStep
                                    key={stage.label}
                                    {...stage}
                                    stepNumber={i + 1}
                                />
                            ))}
                        </div>
                    </div>
                    <Card className='log-panel' variant='outlined' size='sm'>
                        <div className='panel-heading'>
                            <Typography variant='h3'>Live Logs</Typography>
                            <Button
                                variant='text'
                                color='primary'
                                ariaLabel='View full logs'
                            >
                                View Full Logs
                            </Button>
                        </div>
                        <div className='log-list'>
                            {workflowDetails.logs.map((log) => (
                                <div key={log} className='log-item'>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </Card>
                </Card>

                <RunInfoPanel details={workflowDetails} />
            </div>
        </div>
    );
};
export default WorkflowMonitoring;
