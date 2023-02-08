// application
import { useAppAction, useAppSelector } from '@/store/hooks';
import { authLogin, authLogout } from './authActions';
import { AUTH_NAMESPACE } from './authReducer';

export const useAuth = () => useAppSelector((state) => state[AUTH_NAMESPACE]);

export const useLogin = () => useAppAction(authLogin);

export const useLogout = () => useAppAction(authLogout);
