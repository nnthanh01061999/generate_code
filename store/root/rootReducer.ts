import { combineReducers } from 'redux';

import version from '@/store/version';
import exampleReducer, { EXAMPLE_NAMESPACE } from '@/store/reducer/example/exampleReducer';

export default combineReducers({
    version: (state: number = version) => state,
    [EXAMPLE_NAMESPACE]: exampleReducer,
});
