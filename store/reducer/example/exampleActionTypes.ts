// application
export const EXAMPLE_INCREASE = 'EXAMPLE_INCREASE';
export const EXAMPLE_DECREASE = 'EXAMPLE_DECREASE';

export interface ExampleIncreaseAction {
    type: typeof EXAMPLE_INCREASE;
    value: number;
}

export interface ExampleDecreaseAction {
    type: typeof EXAMPLE_DECREASE;
    value: number;
}

export type ExampleAction = ExampleIncreaseAction | ExampleDecreaseAction;
