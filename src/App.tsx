import './App.css';

import {Navigate, Route, Routes} from 'react-router-dom';

import MainLayout from './common/MainLayout';
import Dashboard from './Pages/Dashboard/Dashboard';
import FailureAnalysis from './Pages/FailureAnalysis/FailureAnalysis';
import WorkflowMonitoring from './Pages/WorkflowMonitoring/WorkflowMonitoring';

function App() {
    return (
        <Routes>
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

            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default App;
