import './TerraformPipeline.css';

import {useState} from 'react';
import {FaGithub} from 'react-icons/fa';
import {FiCloud, FiLayers, FiServer} from 'react-icons/fi';

import {Card, TextField, Typography} from '../../../common/components';

type TerraformPipelineProps = {
    data?: any;
};

const FIELDS = [
    {
        key: 'cloudProvider',
        label: 'Cloud Provider',
        placeholder: 'AWS / Azure / GCP',
        icon: <FiCloud size={16} color='#2563eb' />,
        multiline: false,
    },
    {
        key: 'resourceGroup',
        label: 'Resource Group Name',
        placeholder: 'my-resource-group',
        icon: <FiServer size={16} color='#e4e80c' />,
        multiline: false,
    },
    {
        key: 'resources',
        label: 'Resources',
        placeholder: 'aws_instance\naws_s3_bucket\naws_vpc',
        icon: <FiLayers size={16} color='#d83a1b' />,
        multiline: true,
    },
    {
        key: 'repoName',
        label: 'Repo Name',
        placeholder: 'terraform-infra',
        icon: <FaGithub size={16} color='#111827' />,
        multiline: false,
    },
    {
        key: 'deployTargetName',
        label: 'Deploy Target Name',
        placeholder: 'aks-cluster-prod',
        icon: <FiServer size={16} color='#36ea0e' />,
        multiline: false,
    },
];

const TerraformPipeline = ({data}: TerraformPipelineProps) => {
    const tf = data?.terraformPipeline;

    const [fieldValues, setFieldValues] = useState({
        cloudProvider: tf?.cloudProvider ?? '',
        resourceGroup: tf?.resourceGroup ?? '',
        resources: tf?.resources ?? '',
        repoName: tf?.repoName ?? '',
        deployTargetName: tf?.deployTargetName ?? '',
    });
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (key: string, val: string) => {
        setFieldValues((prev) => ({...prev, [key]: val}));
        if (touched[key]) {
            setErrors((prev) => ({
                ...prev,
                [key]: val.trim() ? '' : 'This field is required',
            }));
        }
    };

    const handleBlur = (key: string) => {
        setTouched((prev) => ({...prev, [key]: true}));
        setErrors((prev) => ({
            ...prev,
            [key]: (fieldValues[key as keyof typeof fieldValues] ?? '').trim()
                ? ''
                : 'This field is required',
        }));
    };

    return (
        <div className='pipeline-grid'>
            <div className='pipeline-config card-column'>
                <Card variant='outlined-raised' size='lg'>
                    <Typography variant='h3'>Pipeline Configuration</Typography>

                    {FIELDS.map(
                        ({key, label, placeholder, icon, multiline}) => (
                            <div key={key} className='cd-config-field'>
                                <TextField
                                    label={label}
                                    value={
                                        fieldValues[
                                            key as keyof typeof fieldValues
                                        ]
                                    }
                                    placeholder={placeholder}
                                    variant='outlined'
                                    size='sm'
                                    startDecorator={icon}
                                    multiline={multiline}
                                    rows={multiline ? 5 : undefined}
                                    hasError={Boolean(
                                        touched[key] && errors[key],
                                    )}
                                    errorMessage={
                                        touched[key] ? (errors[key] ?? '') : ''
                                    }
                                    onChange={(e) =>
                                        handleChange(key, e.target.value)
                                    }
                                    onBlur={() => handleBlur(key)}
                                />
                            </div>
                        ),
                    )}
                </Card>
            </div>
        </div>
    );
};

export default TerraformPipeline;
