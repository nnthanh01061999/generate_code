import { EXAMPLE_INCREASE, EXAMPLE_DECREASE } from '@/store/reducer/example/exampleActionTypes';

export interface ExampleState {
    count: number;
}

export interface EXAMPLE_INCREASE_PAYLOAD {
    value: number;
}

export type ExampleDecreaseAction = {
    type: typeof EXAMPLE_DECREASE;
    payload: EXAMPLE_INCREASE_PAYLOAD;
};

export type ExampleIncreaseAction = {
    type: typeof EXAMPLE_INCREASE;
    payload: EXAMPLE_INCREASE_PAYLOAD;
};

export type ExampleTypes = ExampleIncreaseAction | ExampleDecreaseAction;
