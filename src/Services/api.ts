export const fetchFailureAnalysis = async () => {
    const response = await fetch('/api/FailureAnalysis.json');
    if (!response.ok) {
        throw new Error(`Failed to load Failure Analysis: ${response.status}`);
    }
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

export const fetchDashboard = async () => {
    const response = await fetch('/api/Dashboard.json');
    if (!response.ok) {
        throw new Error(`Failed to load dashboard data: ${response.status}`);
    }
    return response.json();
};
