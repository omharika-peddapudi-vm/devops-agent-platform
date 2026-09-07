import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from './common/MainLayout';
import AIAssistant from './Pages/AIAssistant/AIAssistant';
import Dashboard from './Pages/Dashboard/Dashboard';
import FailureAgent from './Pages/FailureAgent/FailureAgent';
import FailureAnalysis from './Pages/FailureAnalysis/FailureAnalysis';
import PipelineManagement from './Pages/PipelineManagement/PipelineManagement';
import WorkflowMonitoring from './Pages/WorkflowMonitoring/WorkflowMonitoring';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />

            <Route
                path='/dashboard'
                element={
                    <MainLayout
                        pageTitle='Dashboard'
                        pageSubtitle='Overview of your DevOps automation platform'
                    >
                        <Dashboard />
                    </MainLayout>
                }
            />

            <Route
                path='/ai-assistant'
                element={
                    <MainLayout
                        pageTitle='AI Assistant'
                        pageSubtitle='Chat with AI to automate your DevOps tasks.'
                    >
                        <AIAssistant />
                    </MainLayout>
                }
            />

            <Route
                path='/pipeline-management'
                element={
                    <MainLayout
                        pageTitle='Pipeline Management'
                        pageSubtitle='Generate and manage CI/CD pipelines.'
                    >
                        <PipelineManagement />
                    </MainLayout>
                }
            />

            <Route
                path='/workflow-monitoring'
                element={
                    <MainLayout
                        pageTitle='Workflow Monitoring'
                        pageSubtitle='Monitor and track all your CI/CD workflows in real-time.'
                    >
                        <WorkflowMonitoring />
                    </MainLayout>
                }
            />

            <Route
                path='/failure-analysis'
                element={
                    <MainLayout
                        pageTitle='Failure Analysis'
                        pageSubtitle='Analyze workflow failures and get AI-powered recommendations.'
                    >
                        <FailureAnalysis />
                    </MainLayout>
                }
            />

            <Route
                path='/failure-agent'
                element={
                    <MainLayout
                        pageTitle='Failure Agent'
                        pageSubtitle='Analyze failures and get actionable corrective steps.'
                    >
                        <FailureAgent />
                    </MainLayout>
                }
            />
        </Routes>
    );
}

export default App;
