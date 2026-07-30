import './App.css';

import MainLayout from './common/MainLayout';
import WorkflowMonitoring from './Pages/WorkflowMonitoring/WorkflowMonitoring';

function App() {
    return (
        <MainLayout
            pageTitle='Workflow Monitoring'
            pageSubtitle='Monitor and track all your CI/CD workflows in real-time.'
        >
            <WorkflowMonitoring />
        </MainLayout>
    );
}

export default App;
