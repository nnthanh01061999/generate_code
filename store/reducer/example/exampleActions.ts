// application
import { EXAMPLE_INCREASE, ExampleAction } from '@/store/reducer/example/exampleActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function increaseExample(value: number): ExampleAction {
    return {
        type: EXAMPLE_INCREASE,
        value,
    };
}

// eslint-disable-next-line import/prefer-default-export
export function decreaseExample(value: number): ExampleAction {
    return {
        type: EXAMPLE_INCREASE,
        value,
    };
}
