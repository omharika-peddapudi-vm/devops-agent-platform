import type React from 'react';

import type {FormData, StepContentProps} from '../MultiStepForm/types';

export interface PageStep {
    id: string;
    title: string;
    component: React.ComponentType<StepContentProps>;
}

export interface PageEngineProps {
    steps: PageStep[];

    testId?: string;

    submitButtonName?: string;

    initialData?: FormData;

    initialStep?: number;

    onSubmit: (data: FormData) => void;

    onCancel?: () => void;

    showStepLabels?: boolean;

    // NEW
    onFirstStepBack?: () => void;
}
