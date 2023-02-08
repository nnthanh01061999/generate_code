import exampleReducer, { EXAMPLE_NAMESPACE } from '@/store/reducer/example/exampleReducer';
import { AppReducerStateType } from '@/store/types';
import authReducer, { AUTH_NAMESPACE } from '../reducer/auth/authReducer';

export interface RootState {
    version: number;
    [EXAMPLE_NAMESPACE]: AppReducerStateType<typeof exampleReducer>;
    [AUTH_NAMESPACE]: AppReducerStateType<typeof authReducer>;
}
