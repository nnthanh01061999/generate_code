import { AUTH_LOGIN, AUTH_LOGOUT } from '@/store/reducer/auth/authActionTypes';

export interface AuthState {
    logged: boolean;
}

export type AuthLoginAction = {
    type: typeof AUTH_LOGIN;
};

export type AuthLogoutAction = {
    type: typeof AUTH_LOGOUT;
};

export type AuthActions = AuthLogoutAction | AuthLoginAction;
