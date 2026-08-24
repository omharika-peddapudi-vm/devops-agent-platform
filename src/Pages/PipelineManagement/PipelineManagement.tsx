import './PipelineManagement.css';

import {useEffect, useState} from 'react';

import {Button, Card, Typography} from '../../common/components';
import {
    fetchCDPipeline,
    fetchCIPipeline,
    fetchTerraformPipeline,
} from '../../Services/api';
import CDPipeline from './CDPipeline';
import CIPipeline from './CIPipeline';
import PipelineLibrary from './PipelineLibrary';
import SavedPipelines from './SavedPipelines';
import TerraformPipeline from './TerraformPipeline';

const TABS = [
    'CI Pipeline',
    'CD Pipeline',
    'Terraform Pipeline',
    'Pipeline Library',
    'Saved Pipelines',
];

const PipelineManagement = () => {
    const [ciTemplate, setCiTemplate] = useState<any>(null);
    const [ciData, setCiData] = useState<any>(null);
    const [cdData, setCdData] = useState<any>(null);
    const [tfData, setTfData] = useState<any>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState('CI Pipeline');
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

    useEffect(() => {
        Promise.all([
            fetch('/api/CIPipeline.json').then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Failed to load CI pipeline data: ${response.status}`,
                    );
                }
                return response.json();
            }),
            fetchCDPipeline(),
            fetchTerraformPipeline(),
        ])
            .then(([ci, cd, tf]) => {
                setCiTemplate(ci);
                setCiData(ci);
                setCdData(cd);
                setTfData(tf);
                setFieldValues({
                    repository: ci.repository ?? '',
                    branch: ci.branch ?? '',
                    technology: ci.technology ?? '',
                    pipelineTool: ci.pipelineTool ?? '',
                    nodeVersion: ci.nodeVersion ?? '',
                });
            })
            .catch((e: unknown) =>
                console.error('Failed to load pipeline data:', e),
            )
            .finally(() => setInitialLoading(false));
    }, []);

    if (initialLoading || !ciData) {
        return (
            <div className='pipeline-page'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Loading...</Typography>
                </Card>
            </div>
        );
    }

    const handleGeneratePipeline = async () => {
        try {
            setGenerating(true);

            const ciPayload = {
                tool: fieldValues.pipelineTool,
                techstack: fieldValues.technology,
                repo_name: fieldValues.repository,
                branch_name: fieldValues.branch,
            };

            const ciResponse = await fetchCIPipeline(ciPayload);
            setCiData(ciResponse);
        } catch (error) {
            console.error('Failed to generate pipeline:', error);
        } finally {
            setGenerating(false);
        }
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'CD Pipeline':
                return <CDPipeline data={{cdPipeline: cdData}} />;
            case 'Terraform Pipeline':
                return <TerraformPipeline data={{terraformPipeline: tfData}} />;
            case 'Pipeline Library':
                return <PipelineLibrary />;
            case 'Saved Pipelines':
                return <SavedPipelines />;
            case 'CI Pipeline':
            default:
                return (
                    <CIPipeline
                        data={ciData}
                        baseData={ciTemplate}
                        fieldValues={fieldValues}
                        setFieldValues={setFieldValues}
                        generating={generating}
                    />
                );
        }
    };

    return (
        <div className='pipeline-page'>
            <div className='pipeline-tabs-bar'>
                <div className='pipeline-tabs'>
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            type='button'
                            className={`pipeline-tab${activeTab === tab ? ' active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    ariaLabel='Generate Pipeline'
                    onClick={handleGeneratePipeline}
                >
                    Generate Pipeline
                </Button>
            </div>

            {renderActiveTab()}
        </div>
    );
};

export default PipelineManagement;
