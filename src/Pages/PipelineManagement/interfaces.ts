import type {Dispatch, SetStateAction} from 'react';

export type PipelineFieldValues = Record<string, string>;
export type PipelineSetFieldValues = Dispatch<
    SetStateAction<PipelineFieldValues>
>;

export interface BasePipelineProps {
    data?: any;
    baseData?: any;
    fieldValues: PipelineFieldValues;
    setFieldValues: PipelineSetFieldValues;
    generating?: boolean;
}

export interface CDPipelineProps extends BasePipelineProps {
    data?: any;
}

export interface CIPipelineProps extends BasePipelineProps {
    data: any;
}

export interface TerraformPipelineProps extends BasePipelineProps {
    data?: any;
}

export type GeneratedPipelineView = {
    filename: string;
    content: string;
};
