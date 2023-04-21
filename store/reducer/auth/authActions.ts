// application
import { AUTH_LOGIN, AUTH_LOGOUT } from './authActionTypes';
import { AuthLoginAction, AuthLogoutAction } from './authTypes';

// eslint-disable-next-line import/prefer-default-export
export function authLogin(): AuthLoginAction {
    return {
        type: AUTH_LOGIN,
    };
}

// eslint-disable-next-line import/prefer-default-export
export function authLogout(): AuthLogoutAction {
    return {
        type: AUTH_LOGOUT,
    };
}
