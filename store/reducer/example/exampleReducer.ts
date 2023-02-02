import { withClientState } from '@/store/client';
import { EXAMPLE_DECREASE, EXAMPLE_INCREASE } from '@/store/reducer/example/exampleActionTypes';
import { ExampleState, ExampleActions } from '@/store/reducer/example/exampleTypes';

const initialState: ExampleState = {
    count: 0,
};

export const EXAMPLE_NAMESPACE = 'example';

function exampleBaseReducer(state = initialState, action: ExampleActions) {
    switch (action.type) {
        case EXAMPLE_INCREASE: {
            const value = action.payload;
            return state.count + value;
        }
        case EXAMPLE_DECREASE: {
            const value = action.payload;
            return state.count - value;
        }
        default:
            return {
                ...state,
            };
    }
}

const exampleReducer = withClientState(exampleBaseReducer, EXAMPLE_NAMESPACE);

export default exampleReducer;
