import './FailureAgent.css';

import { useEffect, useState } from 'react';
import {
	FiCheck,
	FiCopy,
	FiEye,
	FiEyeOff,
	FiSend,
	FiTerminal,
} from 'react-icons/fi';

import { Button, Card, TextField, Typography } from '../../common/components';
import { fetchFailureAgent, triggerFailureAgent } from '../../Services/api';

import type {FormEvent} from 'react';
type FailureAgentData = {
    input: {prompt: string; patToken: string};
    howItWorks: {step: number; title: string; description: string}[];
    output: string;
};

type FailureAgentResponse = {
    output?: string | FailureAgentResponse | FailureAgentResponse[];
    raw?: unknown;
    response?: unknown;
    data?: unknown;
    content?: unknown;
    contents?: unknown;
    messages?: unknown;
    text?: unknown;
};

const getFailureAgentOutput = (value: unknown): string => {
    if (typeof value === 'string') {
        try {
            return getFailureAgentOutput(JSON.parse(value));
        } catch {
            return value.trim();
        }
    }

    if (Array.isArray(value)) {
        for (let index = value.length - 1; index >= 0; index -= 1) {
            const output = getFailureAgentOutput(value[index]);
            if (output) return output;
        }
        return '';
    }

    if (!value || typeof value !== 'object') return '';

    const response = value as FailureAgentResponse;
    if (typeof response.output === 'string') return response.output;

    for (const key of [
        'output',
        'raw',
        'data',
        'content',
        'contents',
        'messages',
        'response',
        'text',
    ]) {
        const output = getFailureAgentOutput(
            response[key as keyof FailureAgentResponse],
        );
        if (output) return output;
    }

    return '';
};

const FailureAgent = () => {
    const [data, setData] = useState<FailureAgentData | null>(null);
    const [analysisResult, setAnalysisResult] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [patToken, setPatToken] = useState('');
    const [isPatVisible, setIsPatVisible] = useState(false);
    const [triggered, setTriggered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        fetchFailureAgent()
            .then((response: FailureAgentData & FailureAgentResponse) => {
                setData(response);
                setAnalysisResult(
                    typeof response.output === 'string'
                        ? response.output
                        : null,
                );
            })
            .catch((error) =>
                console.error('Failed to load failure agent:', error),
            );
    }, []);

    const handleTrigger = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!prompt.trim() || !patToken.trim()) {
            setError(
                'Enter both a prompt and a PAT token before triggering the agent.',
            );
            return;
        }

        setIsSubmitting(true);
        setAnalysisResult(null);
        setTriggered(false);
        setError('');

        try {
            const response = await triggerFailureAgent({
                prompt: prompt.trim(),
                pat_token: patToken.trim(),
            });

            const output = getFailureAgentOutput(response);
            if (!output) {
                throw new Error(
                    'The backend did not return an output message.',
                );
            }

            setAnalysisResult(output);
            setIsCopied(false);
            setTriggered(true);
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : 'Failed to trigger the Failure Agent.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!data) {
        return (
            <Card variant='outlined-raised' size='lg'>
                <Typography variant='h3'>Loading Failure Agent...</Typography>
            </Card>
        );
    }

    return (
        <div className='failure-agent-page'>
            <Card
                className='failure-agent-input-card'
                variant='outlined-raised'
                size='lg'
            >
                <div className='failure-agent-section-title'>
                    <div>
                        <Typography variant='h3'>Provide Input</Typography>
                    </div>
                </div>

                <div className='failure-agent-input-grid'>
                    <form
                        className='failure-agent-form'
                        onSubmit={handleTrigger}
                    >
                        <div className='failure-agent-field'>
                            <label htmlFor='failure-agent-prompt'>Prompt</label>
                            <textarea
                                id='failure-agent-prompt'
                                value={prompt}
                                placeholder='Describe the failure, task, or issue you want the agent to analyze.'
                                maxLength={1000}
                                onChange={(event) =>
                                    setPrompt(event.target.value)
                                }
                            />
                            <span className='failure-agent-counter'>
                                {prompt.length} / 1000
                            </span>
                        </div>
                        <div className='failure-agent-token-field'>
                            <TextField
                                label='PAT Token'
                                type={isPatVisible ? 'text' : 'password'}
                                value={patToken}
                                placeholder='Enter your PAT token'
                                onChange={(event) =>
                                    setPatToken(event.target.value)
                                }
                                variant='outlined'
                                size='sm'
                            />
                            <Button
                                type='button'
                                className='failure-agent-token-toggle'
                                onClick={() =>
                                    setIsPatVisible((visible) => !visible)
                                }
                                aria-label={
                                    isPatVisible
                                        ? 'Hide PAT token'
                                        : 'Show PAT token'
                                }
                                aria-pressed={isPatVisible}
                            >
                                {isPatVisible ? (
                                    <FiEyeOff size={18} />
                                ) : (
                                    <FiEye size={18} />
                                )}
                            </Button>
                        </div>
                        <Button
                            type='submit'
                            className='failure-agent-trigger'
                            variant='contained'
                            color='primary'
                            size='small'
                            startIcon={<FiSend size={14} />}
                            ariaLabel='Trigger Failure Agent'
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Analyzing...'
                                : 'Trigger Failure Agent'}
                        </Button>
                        {triggered && (
                            <Typography
                                className='failure-agent-trigger-feedback'
                                variant='caption'
                                color='success'
                            >
                                Analysis request triggered successfully.
                            </Typography>
                        )}
                        {error && (
                            <Typography
                                className='failure-agent-trigger-feedback'
                                variant='caption'
                                color='error'
                            >
                                {error}
                            </Typography>
                        )}
                    </form>
                    <div className='failure-agent-how-it-works'>
                        <Typography variant='h6'>How it works</Typography>
                        {data.howItWorks.map((item) => (
                            <div
                                className='failure-agent-how-step'
                                key={item.step}
                            >
                                <span className='failure-agent-how-number'>
                                    {item.step}
                                </span>
                                <div>
                                    <Typography variant='h6'>
                                        {item.title}
                                    </Typography>
                                    <Typography variant='caption' color='muted'>
                                        {item.description}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <Card
                className='failure-agent-result-card'
                variant='outlined-raised'
                size='lg'
            >
                <div className='failure-agent-result-header'>
                    <div className='failure-agent-section-title'>
                        <div>
                            <Typography variant='h3'>
                                Analysis Result
                            </Typography>
                        </div>
                    </div>
                </div>
                {isSubmitting ? (
                    <div className='failure-agent-result-loading'>
                        <span className='failure-agent-loading-dot' />
                        Loading backend response...
                    </div>
                ) : analysisResult ? (
                    <div className='failure-agent-console'>
                        <div className='failure-agent-console-header'>
                            <span>
                                <FiTerminal size={13} />
                                Output
                            </span>
                            <Button
                                variant='outlined'
                                size='small'
                                onClick={() => {
                                    void navigator.clipboard.writeText(
                                        analysisResult,
                                    );
                                    setIsCopied(true);
                                    window.setTimeout(
                                        () => setIsCopied(false),
                                        2000,
                                    );
                                }}
                            >
                                {isCopied ? (
                                    <FiCheck size={13} />
                                ) : (
                                    <FiCopy size={13} />
                                )}
                                {isCopied ? 'Copied' : 'Copy'}
                            </Button>
                        </div>
                        <pre className='failure-agent-console-output'>
                            {analysisResult}
                        </pre>
                    </div>
                ) : (
                    <Typography variant='body2' color='muted'>
                        Enter a prompt and PAT token, then trigger the agent to
                        view the response.
                    </Typography>
                )}
            </Card>
        </div>
    );
};

export default FailureAgent;
