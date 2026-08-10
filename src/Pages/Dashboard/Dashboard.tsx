import './Dashboard.css';

import {Fragment, useEffect, useState} from 'react';
import {
    BsArrowRight,
    BsCheckCircle,
    BsCloudUpload,
    BsExclamationTriangle,
    BsFileEarmarkText,
    BsFillHeartPulseFill,
    BsLightningCharge,
    BsList,
    BsPerson,
    BsRobot,
    BsWifi,
} from 'react-icons/bs';
import {FaDocker, FaGithub} from 'react-icons/fa';
import {MdMonitor} from 'react-icons/md';

import {Button, Card, Typography} from '../../common/components';
import {fetchDashboard} from '../../Services/api';

const iconMap: Record<string, any> = {
    coordinator: BsRobot,
    github: FaGithub,
    yaml: BsFileEarmarkText,
    terraform: FaDocker,
    failure: BsFillHeartPulseFill,
    check: BsCheckCircle,
    cloud: BsCloudUpload,
    warning: BsExclamationTriangle,
    wifi: BsWifi,
    lightning: BsLightningCharge,
    user: BsPerson,
    pipeline: BsLightningCharge,
    monitor: MdMonitor,
    activity: BsList,
};

const getIcon = (name: string, size = 18) => {
    const Icon = iconMap[name] ?? BsWifi;
    return <Icon size={size} />;
};

// ── SVG Sparkline ────────────────────────────────────────────────────────────
const Sparkline = ({color}: {color: string}) => {
    const points =
        color === '#ef4444'
            ? [40, 30, 35, 45, 30, 25, 35]
            : [20, 35, 28, 45, 38, 30, 42];
    const w = 80,
        h = 32;
    const min = Math.min(...points),
        max = Math.max(...points);
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const ys = points.map(
        (v) => h - ((v - min) / (max - min || 1)) * (h - 4) - 2,
    );
    const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill='none'>
            <path
                d={d}
                stroke={color}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

// ── Platform Overview SVG Chart ──────────────────────────────────────────────
const LineChart = ({
    data,
}: {
    data: {
        labels: string[];
        success: number[];
        failed: number[];
        running: number[];
    };
}) => {
    const W = 560,
        H = 230,
        padL = 36,
        padB = 28,
        padT = 40,
        padR = 16;
    const chartW = W - padL - padR;
    const chartH = H - padB - padT;
    const yTicks = [0, 20, 40, 60, 80, 100];
    const maxV = 100;
    const toX = (i: number) => padL + (i / (data.labels.length - 1)) * chartW;
    const toY = (v: number) => padT + chartH - (v / maxV) * chartH;
    const makePath = (vals: number[]) =>
        vals
            .map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`)
            .join(' ');

    // Legend centered above chart area
    const legendItems = [
        {label: 'Success', color: '#16a34a'},
        {label: 'Failed', color: '#ef4444'},
        {label: 'Running', color: '#2563eb'},
    ];
    const legendSpacing = 100;
    const legendTotalW = legendItems.length * legendSpacing;
    const legendStartX = padL + chartW / 2 - legendTotalW / 2;

    return (
        <svg
            width='100%'
            viewBox={`0 0 ${W} ${H}`}
            style={{overflow: 'visible'}}
        >
            {/* Legend */}
            {legendItems.map((item, i) => (
                <g
                    key={item.label}
                    transform={`translate(${legendStartX + i * legendSpacing}, 14)`}
                >
                    <circle cx='5' cy='5' r='5' fill={item.color} />
                    <text x='16' y='11' fontSize='12' fill='#6b7280'>
                        {item.label}
                    </text>
                </g>
            ))}

            {/* Grid lines + Y labels */}
            {yTicks.map((v) => (
                <g key={v}>
                    <line
                        x1={padL}
                        x2={W - padR}
                        y1={toY(v)}
                        y2={toY(v)}
                        stroke='#e5e7eb'
                        strokeWidth='1'
                    />
                    <text
                        x={padL - 6}
                        y={toY(v) + 4}
                        textAnchor='end'
                        fontSize='11'
                        fill='#9ca3af'
                    >
                        {v}
                    </text>
                </g>
            ))}

            {/* X labels */}
            {data.labels.map((l, i) => (
                <text
                    key={l}
                    x={toX(i)}
                    y={H - 6}
                    textAnchor='middle'
                    fontSize='11'
                    fill='#9ca3af'
                >
                    {l}
                </text>
            ))}

            {/* Lines */}
            <path
                d={makePath(data.success)}
                stroke='#16a34a'
                strokeWidth='1.75'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d={makePath(data.running)}
                stroke='#2563eb'
                strokeWidth='1.75'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
            <path
                d={makePath(data.failed)}
                stroke='#ef4444'
                strokeWidth='1.75'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
            />

            {/* Dots */}
            {data.success.map((v, i) => (
                <circle
                    key={i}
                    cx={toX(i)}
                    cy={toY(v)}
                    r='3.5'
                    fill='#16a34a'
                />
            ))}
            {data.running.map((v, i) => (
                <circle
                    key={i}
                    cx={toX(i)}
                    cy={toY(v)}
                    r='3.5'
                    fill='#2563eb'
                />
            ))}
            {data.failed.map((v, i) => (
                <circle
                    key={i}
                    cx={toX(i)}
                    cy={toY(v)}
                    r='3.5'
                    fill='#ef4444'
                />
            ))}
        </svg>
    );
};

// ── Quick Actions static data (bypasses JSON cache) ─────────────────────────
const QUICK_ACTIONS = [
    {
        label: 'Generate Pipeline',
        description: 'Create CI/CD pipeline',
        icon: 'pipeline',
        iconBg: '#2563eb',
        iconColor: '#ffffff',
    },
    {
        label: 'Create Infrastructure',
        description: 'Provision cloud resources',
        icon: 'terraform',
        iconBg: '#ea580c',
        iconColor: '#ffffff',
    },
    {
        label: 'Create Pull Request',
        description: 'Open a new Pull Request',
        icon: 'github',
        iconBg: '#111827',
        iconColor: '#ffffff',
    },
    {
        label: 'Monitor Workflows',
        description: 'View and monitor workflows',
        icon: 'monitor',
        iconBg: '#16a34a',
        iconColor: '#ffffff',
    },
    {
        label: 'Analyze Failure',
        description: 'Analyze and fix failures',
        icon: 'failure',
        iconBg: '#dc2626',
        iconColor: '#ffffff',
    },
    {
        label: 'View All Activity',
        description: 'View recent platform activity',
        icon: 'activity',
        iconBg: '#2563eb',
        iconColor: '#ffffff',
    },
];

// ── Dashboard ────────────────────────────────────────────────────────────────
const Dashboard = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard()
            .then(setData)
            .catch((e) => console.error('Failed to load dashboard data:', e))
            .finally(() => setLoading(false));
    }, []);

    if (loading || !data) {
        return (
            <div className='dashboard-page'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Loading dashboard...</Typography>
                </Card>
            </div>
        );
    }

    return (
        <div className='dashboard-page'>
            {/* ── Stat Cards ── */}
            <section className='dashboard-top-cards'>
                {data.statCards.map((card: any) => (
                    <Card
                        key={card.label}
                        className='dashboard-stat-card'
                        variant='outlined-raised'
                        size='sm'
                    >
                        <div className='stat-card-body'>
                            <span
                                className='stat-card-icon'
                                style={{
                                    background: card.iconBg,
                                    color: card.iconColor,
                                }}
                            >
                                {getIcon(card.icon, 26)}
                            </span>
                            <div className='stat-card-content'>
                                <Typography variant='caption' color='muted'>
                                    {card.label}
                                </Typography>
                                <Typography
                                    variant='h2'
                                    style={{lineHeight: 1.1, margin: '2px 0'}}
                                >
                                    {card.value}
                                </Typography>
                                <div className='stat-card-footer'>
                                    <span
                                        className={`stat-change ${card.changeType}`}
                                    >
                                        {card.changeType === 'error'
                                            ? '↓'
                                            : '↑'}{' '}
                                        {card.change}
                                    </span>
                                    <Sparkline
                                        color={
                                            card.changeType === 'error'
                                                ? '#ef4444'
                                                : '#16a34a'
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </section>

            {/* ── Mid Grid ── */}
            <section className='dashboard-mid-grid'>
                {/* Agent Status */}
                <Card
                    className='agent-status-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>Agent Status</Typography>
                    </div>
                    <div className='agent-status-list'>
                        {data.agents.map((agent: any) => (
                            <div
                                key={agent.title}
                                className='agent-status-item'
                            >
                                <span
                                    className={`agent-status-icon ${agent.icon}`}
                                >
                                    {getIcon(agent.icon)}
                                </span>
                                <div className='agent-status-text'>
                                    <Typography variant='body2'>
                                        {agent.title}
                                    </Typography>
                                    <Typography variant='caption' color='muted'>
                                        {agent.subtitle}
                                    </Typography>
                                </div>
                                <span className='agent-online-pill'>
                                    <span className='online-dot' />
                                    {agent.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant='text'
                        color='primary'
                        size='small'
                        ariaLabel='View all agents'
                    >
                        View All Agents
                    </Button>
                </Card>

                {/* Recent Activity */}
                <Card
                    className='recent-activity-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>Recent Activity</Typography>
                        <Button
                            variant='text'
                            color='primary'
                            size='small'
                            ariaLabel='View all activity'
                        >
                            View All
                        </Button>
                    </div>
                    <div className='recent-activity-list'>
                        {data.recentActivity.map((activity: any) => (
                            <div
                                key={activity.title}
                                className='recent-activity-item'
                            >
                                <div className='activity-left'>
                                    <div
                                        className={`activity-icon ${activity.variant}`}
                                    >
                                        {getIcon(activity.icon)}
                                    </div>
                                    <div className='activity-text'>
                                        <Typography variant='body2'>
                                            {activity.title}
                                        </Typography>
                                    </div>
                                </div>
                                <span className='activity-time'>
                                    {activity.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Agent Execution Flow */}
                <Card
                    className='execution-flow-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>
                            Agent Execution Flow
                        </Typography>
                        <Button
                            variant='text'
                            color='primary'
                            size='small'
                            ariaLabel='View full flow'
                        >
                            View Full Flow
                        </Button>
                    </div>

                    {/* Top row: User → Coordinator → YAML → GitHub */}
                    <div className='flow-row'>
                        {data.executionFlow.topRow.map(
                            (step: any, index: number) => (
                                <Fragment key={step.title}>
                                    <div className='flow-node'>
                                        <div
                                            className={`flow-node-icon flow-icon-${step.icon}`}
                                        >
                                            {getIcon(step.icon, 24)}
                                        </div>
                                        <span className='flow-node-title'>
                                            {step.title}
                                        </span>
                                        <span className='flow-node-subtitle'>
                                            {step.subtitle}
                                        </span>
                                    </div>
                                    {index <
                                        data.executionFlow.topRow.length -
                                            1 && (
                                        <div className='flow-arrow-wrap'>
                                            <span className='flow-arrow'>
                                                →
                                            </span>
                                        </div>
                                    )}
                                </Fragment>
                            ),
                        )}
                    </div>

                    {/* Connector: dashed vertical aligned to right (GitHub column) */}
                    <div className='flow-connector-wrap'>
                        <div className='flow-connector-dashed' />
                        <div className='flow-connector-solid-arrow'>↓</div>
                    </div>

                    {/* Bottom row: Completed(col1) ← Failure(col2) ← [spacer col3] Terraform(col4=under GitHub) */}
                    <div className='flow-row-bottom'>
                        {data.executionFlow.bottomRow.map(
                            (step: any, index: number) => (
                                <Fragment key={step.title}>
                                    <div className='flow-node'>
                                        <div
                                            className={`flow-node-icon flow-icon-${step.variant}`}
                                        >
                                            {getIcon(step.icon, 24)}
                                        </div>
                                        <span className='flow-node-title'>
                                            {step.title}
                                        </span>
                                        <span className='flow-node-subtitle'>
                                            {step.subtitle}
                                        </span>
                                    </div>
                                    {index === 0 && (
                                        <div className='flow-arrow-wrap'>
                                            <span className='flow-arrow'>
                                                ←
                                            </span>
                                        </div>
                                    )}
                                    {index === 1 && (
                                        <>
                                            <div className='flow-arrow-wrap'>
                                                <span className='flow-arrow'>
                                                    ←
                                                </span>
                                            </div>
                                            <div className='flow-spacer' />
                                        </>
                                    )}
                                </Fragment>
                            ),
                        )}
                    </div>
                </Card>
            </section>

            {/* ── Bottom Grid ── */}
            <section className='dashboard-bottom-grid'>
                <Card
                    className='platform-overview-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>Platform Overview</Typography>
                        <div className='overview-controls'>
                            <select className='overview-select'>
                                <option>Last 7 Days</option>
                            </select>
                        </div>
                    </div>
                    <div className='chart-wrapper'>
                        <LineChart data={data.overview} />
                    </div>
                </Card>

                <Card
                    className='quick-actions-card'
                    variant='outlined-raised'
                    size='lg'
                >
                    <div className='card-heading-row'>
                        <Typography variant='h3'>Quick Actions</Typography>
                    </div>
                    <div className='quick-actions-grid'>
                        {QUICK_ACTIONS.map((action) => (
                            <button
                                key={action.label}
                                className='quick-action-tile'
                            >
                                <div className='quick-action-tile-left'>
                                    <span
                                        className='quick-action-icon'
                                        style={{
                                            background: action.iconBg,
                                            color: action.iconColor,
                                        }}
                                    >
                                        {getIcon(action.icon, 22)}
                                    </span>
                                    <div className='quick-action-text'>
                                        <span className='qa-label'>
                                            {action.label}
                                        </span>
                                        <span className='qa-desc'>
                                            {action.description}
                                        </span>
                                    </div>
                                </div>
                                <BsArrowRight
                                    size={15}
                                    className='quick-action-arrow'
                                />
                            </button>
                        ))}
                    </div>
                </Card>
            </section>
        </div>
    );
};

export default Dashboard;
