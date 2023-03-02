import { AppReducerStateType } from '@/store/types';
import authReducer, { AUTH_NAMESPACE } from '@/store/reducer/auth/authReducer';
import deviceReducer, { DEVICE_NAMESPACE } from '@/store/reducer/device/deviceReducer';
import exampleReducer, { EXAMPLE_NAMESPACE } from '@/store/reducer/example/exampleReducer';

export interface RootState {
    version: number;
    [EXAMPLE_NAMESPACE]: AppReducerStateType<typeof exampleReducer>;
    [AUTH_NAMESPACE]: AppReducerStateType<typeof authReducer>;
    [DEVICE_NAMESPACE]: AppReducerStateType<typeof deviceReducer>;
}
