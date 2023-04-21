import { useAppAction } from '@/store/hooks';
import { AppReducer } from '@/store/types';
import { Action } from 'redux';

const APPLY_CACHE_STORAGE = 'APPLY_CACHE_STORAGE';

type ApplyStorageStateAction<T> = {
    type: typeof APPLY_CACHE_STORAGE;
    state: T;
};

function isApplyStorageStateAction<T extends any>(action: Action): action is ApplyStorageStateAction<T> {
    return action.type === APPLY_CACHE_STORAGE;
}

export function applyStorageState<T extends object>(state: T): ApplyStorageStateAction<T> {
    return {
        type: APPLY_CACHE_STORAGE,
        state,
    };
}

export const useApplyStorageState = () => useAppAction(applyStorageState);

export type StateCookie = 'cookie';
export type StateStorage = 'storage';
export type CacheType = StateCookie | StateStorage;

export function withStorageState<T extends AppReducer<any, any>, S extends ReturnType<T>, R extends S & { cacheType: CacheType }>(
    reducer: T extends AppReducer<ReturnType<T> & { cacheType: any }, any> ? AppReducer<ReturnType<T> & { cacheType: never }, any> : T,
    namespace: string,
): AppReducer<R> {
    return (state: S, action: Action | ApplyStorageStateAction<{ [ns: string]: any }>): R => {
        const childState = reducer(state, action);

        if (isApplyStorageStateAction(action)) {
            const action_ = action as ApplyStorageStateAction<{ [ns: string]: any }>;
            if (namespace in action_.state) {
                return {
                    ...action_.state[namespace],
                    cacheType: 'storage',
                };
            }
        }

        if ('cacheType' in childState) {
            return childState;
        }

        return {
            ...childState,
            cacheType: 'storage',
        };
    };
}
