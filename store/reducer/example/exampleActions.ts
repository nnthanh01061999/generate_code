// application
import { EXAMPLE_DECREASE, EXAMPLE_INCREASE } from '@/store/reducer/example/exampleActionTypes';
import { ExampleDecreaseAction, ExampleIncreaseAction } from '@/store/reducer/example/exampleTypes';

// eslint-disable-next-line import/prefer-default-export
export function increaseExample(payload: number): ExampleIncreaseAction {
    return {
        type: EXAMPLE_INCREASE,
        payload,
    };
}

// eslint-disable-next-line import/prefer-default-export
export function decreaseExample(payload: number): ExampleDecreaseAction {
    return {
        type: EXAMPLE_DECREASE,
        payload,
    };
}
