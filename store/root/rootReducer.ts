import { combineReducers } from 'redux';

import version from '@/store/version';
import exampleReducer, { EXAMPLE_NAMESPACE } from '@/store/reducer/example/exampleReducer';
import authReducer, { AUTH_NAMESPACE } from '@/store/reducer/auth/authReducer';
import deviceReducer, { DEVICE_NAMESPACE } from '@/store/reducer/device/deviceReducer';
import appReducer, { APP_CONFIG_NAMESPACE } from '../reducer/app-config/appConfigReducer';

export default combineReducers({
    version: (state: number = version) => state,
    [EXAMPLE_NAMESPACE]: exampleReducer,
    [AUTH_NAMESPACE]: authReducer,
    [DEVICE_NAMESPACE]: deviceReducer,
    [APP_CONFIG_NAMESPACE]: appReducer,
});
