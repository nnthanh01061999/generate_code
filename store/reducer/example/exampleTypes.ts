import { EXAMPLE_INCREASE, EXAMPLE_DECREASE } from '@/store/reducer/example/exampleActionTypes';

export interface ExampleState {
    count: number;
}

export type ExampleDecreaseAction = {
    type: typeof EXAMPLE_DECREASE;
    payload: number;
};

export type ExampleIncreaseAction = {
    type: typeof EXAMPLE_INCREASE;
    payload: number;
};

export type ExampleActions = ExampleIncreaseAction | ExampleDecreaseAction;
