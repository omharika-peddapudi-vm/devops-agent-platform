const DEFAULT_API_BASE_URL =
    'https://devopsagent-backend-aegmehh9gcetepbf.eastus-01.azurewebsites.net';
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ??
    DEFAULT_API_BASE_URL;

const backendUrl = (path: string) => `${API_BASE_URL}${path}`;

export const fetchDashboard = async () => {
    const response = await fetch('/api/Dashboard.json');
    if (!response.ok) {
        throw new Error(`Failed to load dashboard data: ${response.status}`);
    }
    return response.json();
};

export const fetchAIAssistant = async () => {
    const response = await fetch('/api/AIAssistant.json');
    if (!response.ok) {
        throw new Error(`Failed to load AI assistant data: ${response.status}`);
    }
    return response.json();
};

export const fetchPipelineManagement = async () => {
    const response = await fetch('/api/PipelineManagement.json');
    if (!response.ok) {
        throw new Error(
            `Failed to load pipeline management data: ${response.status}`,
        );
    }
    return response.json();
};

export const fetchCIPipeline = async (payload: any) => {
    const response = await fetch(backendUrl('/yaml-ops/ci-builder'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Failed to load CI pipeline: ${response.status}`);
    }

    return response.json();
};

export const fetchCDPipeline = async (payload?: any) => {
    if (payload) {
        const response = await fetch(backendUrl('/yaml-ops/cd-builder'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to load CD pipeline: ${response.status}`);
        }

        return response.json();
    }

    const response = await fetch('/api/CDPipeline.json');
    if (!response.ok) {
        throw new Error(
            `Failed to load CD pipeline template: ${response.status}`,
        );
    }

    return response.json();
};

export const fetchTerraformPipeline = async (payload?: any) => {
    if (payload) {
        const response = await fetch(backendUrl('/yaml-ops/tf-builder'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to generate Terraform pipeline: ${response.status}`,
            );
        }

        return response.json();
    }

    const response = await fetch('/api/TerraformPipeline.json');
    if (!response.ok)
        throw new Error(
            `Failed to load Terraform pipeline: ${response.status}`,
        );
    return response.json();
};

export const fetchWorkflowMonitoring = async () => {
    const response = await fetch('/api/WorkflowMonitoring.json');
    if (!response.ok) {
        throw new Error(
            `Failed to load Workflow Monitoring: ${response.status}`,
        );
    }
    return response.json();
};

export const fetchFailureAnalysis = async () => {
    const response = await fetch('/api/FailureAnalysis.json');
    if (!response.ok) {
        throw new Error(`Failed to load Failure Analysis: ${response.status}`);
    }
    return response.json();
};
