import './FailureAnalysis.css';

import {useEffect, useState} from 'react';
import {BsArrowLeft} from 'react-icons/bs';

import {Button, Card, Typography} from '../../common/components';
import {fetchFailureAnalysis} from '../../Services/api';

type FailureAnalysisSummary = {
    workflow: string;
    repository: string;
    branch: string;
    failedAt: string;
    duration: string;
    runId: string;
    status: string;
};

type FailureAnalysisAiAnalysis = {
    rootCause: string;
    impact: string;
    confidenceScore: number;
    recommendedFix: string[];
};

type FailureAnalysisRelatedFailure = {
    id: string;
    workflow: string;
    failedAt: string;
    error: string;
    status: string;
};

type FailureAnalysisAction = {
    id: string;
    label: string;
    variant: 'contained' | 'outlined' | 'text';
    color: 'primary' | 'secondary' | 'success' | 'error';
};

type FailureAnalysisData = {
    summary: FailureAnalysisSummary;
    errorMessage: string[];
    aiAnalysis: FailureAnalysisAiAnalysis;
    relatedFailures: FailureAnalysisRelatedFailure[];
    actions: FailureAnalysisAction[];
};

const FailureAnalysis = () => {
    const [data, setData] = useState<FailureAnalysisData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchFailureAnalysis();
                setData(response as FailureAnalysisData);
            } catch (error) {
                console.error('Failed to load failure analysis:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading || !data) {
        return (
            <div className='failure-analysis-page'>
                <Card
                    className='loading-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <Typography variant='h3'>
                        Loading failure analysis...
                    </Typography>
                </Card>
            </div>
        );
    }

    const statusClass = data.summary.status.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className='failure-analysis-page'>
            <div className='failure-analysis-header'>
                <Button
                    variant='text'
                    color='primary'
                    size='small'
                    startIcon={<BsArrowLeft size={16} />}
                    ariaLabel='Back to workflows'
                >
                    Back to Workflows
                </Button>
            </div>

            <Card
                className='failure-summary-card'
                variant='outlined-raised'
                size='lg'
            >
                <div className='failure-summary-card-header'>
                    <Typography variant='h3'>Failure Summary</Typography>
                    <span className={`status-pill ${statusClass}`}>
                        × {data.summary.status}
                    </span>
                </div>

                <div className='failure-summary-details'>
                    <div className='summary-detail-item'>
                        <Typography variant='body2' color='muted'>
                            Workflow
                        </Typography>
                        <Typography variant='body2' color='primary'>
                            {data.summary.workflow}
                        </Typography>
                    </div>
                    <div className='summary-detail-item'>
                        <Typography variant='body2' color='muted'>
                            Repository
                        </Typography>
                        <Typography variant='body2' color='primary'>
                            {data.summary.repository}
                        </Typography>
                    </div>
                    <div className='summary-detail-item'>
                        <Typography variant='body2' color='muted'>
                            Branch
                        </Typography>
                        <Typography variant='body2' color='primary'>
                            {data.summary.branch}
                        </Typography>
                    </div>
                    <div className='summary-detail-item'>
                        <Typography variant='body2' color='muted'>
                            Failed At
                        </Typography>
                        <Typography variant='body2' color='primary'>
                            {data.summary.failedAt}
                        </Typography>
                    </div>
                    <div className='summary-detail-item'>
                        <Typography variant='body2' color='muted'>
                            Duration
                        </Typography>
                        <Typography variant='body2' color='primary'>
                            {data.summary.duration}
                        </Typography>
                    </div>
                    <div className='summary-detail-item'>
                        <Typography variant='body2' color='muted'>
                            Run ID
                        </Typography>
                        <Typography variant='body2' color='primary'>
                            {data.summary.runId}
                        </Typography>
                    </div>
                </div>
            </Card>

            <div className='failure-analysis-grid'>
                <Card
                    className='error-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>Error Message</Typography>
                    </div>
                    <div className='error-message-copy'>
                        {data.errorMessage.map((line, index) => (
                            <Typography
                                variant='body2'
                                key={index}
                                className='error-line'
                                color='error'
                            >
                                {line}
                            </Typography>
                        ))}
                    </div>
                </Card>

                <div className='right-column'>
                    <Card
                        className='analysis-summary-card'
                        variant='outlined-raised'
                        size='lg'
                    >
                        <div className='card-heading-row'>
                            <Typography variant='h3'>AI Analysis</Typography>
                        </div>

                        <div className='ai-analysis-section'>
                            <Typography variant='subtitle2' color='primary'>
                                Root Cause
                            </Typography>
                            <Typography variant='body2' color='heading'>
                                {data.aiAnalysis.rootCause}
                            </Typography>
                        </div>

                        <div className='ai-analysis-section'>
                            <Typography variant='subtitle2' color='primary'>
                                Impact
                            </Typography>
                            <Typography variant='body2' color='heading'>
                                {data.aiAnalysis.impact}
                            </Typography>
                        </div>

                        <div className='confidence-score-card'>
                            <div className='confidence-score-heading'>
                                <Typography variant='subtitle2' color='primary'>
                                    Confidence Score
                                </Typography>
                                <Typography variant='body2' color='heading'>
                                    {data.aiAnalysis.confidenceScore}%
                                </Typography>
                            </div>
                            <progress
                                className='confidence-progress'
                                value={data.aiAnalysis.confidenceScore}
                                max={100}
                            />
                        </div>
                    </Card>

                    <Card
                        className='recommended-fix-card'
                        variant='outlined-raised'
                        size='lg'
                    >
                        <div className='card-heading-row'>
                            <Typography variant='h3'>
                                Recommended Fix
                            </Typography>
                        </div>
                        <ol className='recommended-fixes'>
                            {data.aiAnalysis.recommendedFix.map(
                                (fix, index) => (
                                    <li
                                        key={index}
                                        className='recommended-fix-item'
                                    >
                                        <Typography
                                            variant='body2'
                                            color='success'
                                        >
                                            {fix}
                                        </Typography>
                                    </li>
                                ),
                            )}
                        </ol>
                        <Button
                            variant='contained'
                            color='success'
                            size='medium'
                            ariaLabel='Generate fix automatically'
                        >
                            Generate Fix Automatically
                        </Button>
                    </Card>
                </div>
            </div>

            <div className='failure-analysis-grid lower-grid'>
                <Card
                    className='actions-card'
                    variant='outlined-raised'
                    size='md'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>Actions</Typography>
                    </div>
                    <div className='action-buttons'>
                        {data.actions.map((action: FailureAnalysisAction) => (
                            <Button
                                key={action.id}
                                variant={action.variant}
                                color={action.color}
                                size='medium'
                                ariaLabel={action.label}
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </Card>

                <Card
                    className='related-failures-card'
                    variant='outlined-raised'
                    size='md'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>Related Failures</Typography>
                        <Button
                            variant='text'
                            color='primary'
                            size='small'
                            ariaLabel='View all related failures'
                        >
                            View All
                        </Button>
                    </div>

                    <div className='related-failures-table-wrapper'>
                        <table className='related-failures-table'>
                            <thead>
                                <tr>
                                    <th>Workflow</th>
                                    <th>Failed At</th>
                                    <th>Error</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.relatedFailures.map((failure) => (
                                    <tr key={failure.id}>
                                        <td>
                                            <Typography variant='body2'>
                                                {failure.workflow}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant='body2'>
                                                {failure.failedAt}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography variant='body2'>
                                                {failure.error}
                                            </Typography>
                                        </td>
                                        <td>
                                            <span
                                                className={`status-chip ${failure.status.toLowerCase()}`}
                                            >
                                                {failure.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default FailureAnalysis;
