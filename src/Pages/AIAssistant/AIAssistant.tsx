import './AIAssistant.css';

import {useEffect, useState} from 'react';

import {Button, Card, TextField, Typography} from '../../common/components';

type ChatMessage = {
    id: string;
    sender: 'assistant' | 'user';
    text: string;
    time: string;
};

type AgentFlowItem = {
    id: string;
    name: string;
    status: 'completed' | 'in-progress' | 'pending';
    description: string;
};

type DetailItem = {
    label: string;
    value: string;
};

type LogItem = {
    time: string;
    text: string;
};

type AIAssistantData = {
    conversationHistory: Array<{
        id: string;
        title: string;
        subtitle: string;
        active?: boolean;
    }>;
    activeConversation: {
        title: string;
        summary: string;
        messages: ChatMessage[];
    };
    agentFlow: AgentFlowItem[];
    executionDetails: {
        status: string;
        progress: number;
        summary: DetailItem[];
        logs: LogItem[];
    };
};

const AIAssistant = () => {
    const [data, setData] = useState<AIAssistantData | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/AIAssistant.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load AI assistant data');
                }
                return response.json();
            })
            .then((json) => setData(json))
            .catch((error) => console.error('AI assistant load error:', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading || !data) {
        return (
            <div className='ai-assistant-shell ai-assistant-loading'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Loading...</Typography>
                </Card>
            </div>
        );
    }

    return (
        <div className='ai-assistant-shell'>
            <aside className='ai-assistant-sidebar'>
                <div className='ai-assistant-header'>
                    <Typography variant='h3' className='ai-assistant-title'>
                        AI Agent
                    </Typography>
                </div>

                <div className='conversation-list'>
                    {data.conversationHistory.map((item) => (
                        <button
                            key={item.id}
                            type='button'
                            className={`conversation-item ${item.active ? 'active' : ''}`}
                        >
                            <div className='conversation-badge'>
                                {item.title.slice(0, 2).toUpperCase()}
                            </div>
                            <div className='conversation-copy'>
                                <div className='conversation-title'>
                                    {item.title}
                                </div>
                                <div className='conversation-subtitle'>
                                    {item.subtitle}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>

            <main className='ai-chat-panel'>
                <div className='chat-thread'>
                    <div className='chat-header-row'>
                        <div>
                            <Typography variant='h3' className='chat-title'>
                                {data.activeConversation.title}
                            </Typography>
                            <Typography
                                variant='body2'
                                className='chat-summary'
                            >
                                {data.activeConversation.summary}
                            </Typography>
                        </div>
                    </div>

                    <div className='message-list'>
                        {data.activeConversation.messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`message-row ${msg.sender === 'user' ? 'user' : 'assistant'}`}
                            >
                                <div className='message-bubble'>{msg.text}</div>
                                <div className='message-time'>{msg.time}</div>
                            </div>
                        ))}
                    </div>

                    <div className='composer'>
                        <TextField
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            placeholder='Type your prompt...'
                            aria-label='Type a message'
                            className='message-input'
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            size='small'
                            className='send-button'
                            ariaLabel='Send message'
                        >
                            ➤
                        </Button>
                    </div>
                </div>
            </main>

            <aside className='ai-details-panel'>
                <Card
                    variant='outlined-raised'
                    size='md'
                    className='details-card'
                >
                    <div className='detail-section'>
                        <Typography variant='h4'>Agent Flow</Typography>
                        <div className='agent-flow-list'>
                            {data.agentFlow.map((item) => (
                                <div key={item.id} className='agent-flow-item'>
                                    <div className='agent-icon-wrap'>
                                        <span
                                            className={`dot ${item.status}`}
                                        />
                                    </div>
                                    <div className='agent-copy'>
                                        <div className='agent-name'>
                                            {item.name}
                                        </div>
                                        <div className='agent-desc'>
                                            {item.description}
                                        </div>
                                    </div>
                                    <span
                                        className={`agent-status ${item.status}`}
                                    >
                                        {item.status.replace('-', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card
                    variant='outlined-raised'
                    size='md'
                    className='details-card'
                >
                    <div className='detail-group'>
                        <Typography variant='body2' className='detail-label'>
                            Status
                        </Typography>
                        <Typography variant='body1' className='detail-value'>
                            {data.executionDetails.status}
                        </Typography>
                    </div>

                    <div className='detail-group'>
                        <Typography variant='body2' className='detail-label'>
                            Progress
                        </Typography>
                        <div className='progress-line'>
                            <span
                                className={`progress-fill progress-${data.executionDetails.progress}`}
                            />
                        </div>
                        <Typography variant='body1' className='progress-value'>
                            {data.executionDetails.progress}%
                        </Typography>
                    </div>

                    {data.executionDetails.summary.map((item) => (
                        <div key={item.label} className='detail-group'>
                            <Typography
                                variant='body2'
                                className='detail-label'
                            >
                                {item.label}
                            </Typography>
                            <Typography
                                variant='body1'
                                className='detail-value'
                            >
                                {item.value}
                            </Typography>
                        </div>
                    ))}
                </Card>

                <Card variant='outlined-raised' size='md' className='logs-card'>
                    <Typography variant='h4'>Execution logs</Typography>
                    <div className='logs-list'>
                        {data.executionDetails.logs.map((log, index) => (
                            <div
                                key={`${log.time}-${index}`}
                                className='log-item'
                            >
                                <span className='log-time'>{log.time}</span>
                                <span>{log.text}</span>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant='outlined'
                        color='primary'
                        className='view-all-button'
                    >
                        View all logs
                    </Button>
                </Card>
            </aside>
        </div>
    );
};

export default AIAssistant;
