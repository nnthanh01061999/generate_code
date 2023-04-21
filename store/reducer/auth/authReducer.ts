import { withClientState } from '@/store/client';
import { AUTH_LOGIN, AUTH_LOGOUT } from './authActionTypes';
import { AuthActions, AuthState } from './authTypes';

const initialState: AuthState = {
    logged: false,
};

export const AUTH_NAMESPACE = 'auth';

function exampleBaseReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case AUTH_LOGIN: {
            return {
                ...state,
                logged: true,
            };
        }
        case AUTH_LOGOUT: {
            return {
                ...state,
                logged: false,
            };
        }
        default:
            return {
                ...state,
            };
    }
}

const exampleReducer = withClientState(exampleBaseReducer, AUTH_NAMESPACE);

export default exampleReducer;
