import { ERRROR_CODE_EXPIRED_TOKEN } from '@/data';
import { AUTH_NAMESPACE } from '@/store/reducer/auth/authReducer';
import { STATE } from '@/store/store';
import axios from 'axios';
import { getCookieJson } from '.';

export const NETWORK_TIMEOUT = 30000;
export const NETWORK_MESSAGE = 'Timeout. Something went wrong!';

export const getLocalAccessToken = () => {
    const store = getCookieJson(STATE);
    return store?.[AUTH_NAMESPACE]?.accessToken ?? '';
};

export const getLocalRefreshToken = () => {
    const store = getCookieJson(STATE);
    return store?.[AUTH_NAMESPACE]?.refreshToken ?? '';
};

export const networkHandler = axios.create({
    timeout: NETWORK_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getLocalAccessToken(),
        'Accept-Language': 'en',
    },
});

networkHandler.defaults.timeout = NETWORK_TIMEOUT;
networkHandler.defaults.timeoutErrorMessage = NETWORK_MESSAGE;

let isRefreshing = false;
let failedQueue: Array<{ resolve: any; reject: any }> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

let interceptor: number | null = null;

export const axiosSetToken = (token: string) => {
    if (interceptor !== null) {
        networkHandler.interceptors.request.eject(interceptor);
    }
    interceptor = networkHandler.interceptors.request.use(
        function (config) {
            config.headers.Authorization = token;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        },
    );
};

export const updateHeadersForLocale = (locale: string) => {
    // Remove any existing locale interceptor
    if (interceptor !== null) {
        networkHandler.interceptors.request.eject(interceptor);
    }

    // Add the new locale interceptor
    interceptor = networkHandler.interceptors.request.use(
        function (config) {
            config.headers['Accept-Language'] = locale;
            config.headers.Authorization = 'Bearer ' + getLocalAccessToken();
            return config;
        },
        function (error) {
            return Promise.reject(error);
        },
    );
};

networkHandler.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { config, response } = error;
        const status = response?.status;

        const originalRequest = config;

        if (status === 401) {
            const code = response?.data?.error_code;
            if (code === ERRROR_CODE_EXPIRED_TOKEN) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    // return authApi
                    //     .refreshToken()
                    //     .then((rs) => {
                    //         const token = rs.data?.data;
                    //         isRefreshing = false;
                    //         store.dispatch(refreshToken(token));
                    //         axiosSetToken(`Bearer ${token}`);
                    //         processQueue(null, token);
                    //         originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    //         return networkHandler(originalRequest);
                    //     })
                    //     .catch((err) => {
                    //         isRefreshing = false;
                    //         processQueue(err, null);
                    //         Promise.reject(err);
                    //         store.dispatch(logout());
                    //     });
                }
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return networkHandler(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }
        }
        if (response) {
            return Promise.reject(response.data);
        }
        return Promise.reject(error);
    },
);
