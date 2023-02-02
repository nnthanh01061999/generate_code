import { EXAMPLE_DECREASE, EXAMPLE_INCREASE } from '@/store/reducer/example/exampleActionTypes';
import { ExampleState, ExampleTypes } from '@/store/reducer/example/exampleTypes';

const initialState: ExampleState = {
    count: 0,
};

export const EXAMPLE_NAMESPACE = 'example';

function exampleBaseReducer(state = initialState, action: ExampleTypes) {
    switch (action.type) {
        case EXAMPLE_INCREASE: {
            const { value } = action.payload;
            return state.count + value;
        }
        case EXAMPLE_DECREASE: {
            const { value } = action.payload;
            return state.count - value;
        }
        default:
            return {
                ...state,
            };
    }
}

export default exampleBaseReducer;
