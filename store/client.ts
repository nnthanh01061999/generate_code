import { useAppAction } from '@/store/hooks';
import { AppReducer } from '@/store/types';
import { Action } from 'redux';

const APPLY_CLIENT_STATE = 'APPLY_CLIENT_STATE';

type ApplyClientStateAction<T> = {
    type: typeof APPLY_CLIENT_STATE;
    state: T;
};

function isApplyClientStateAction<T extends any>(action: Action): action is ApplyClientStateAction<T> {
    return action.type === APPLY_CLIENT_STATE;
}

export function applyClientState<T extends object>(state: T): ApplyClientStateAction<T> {
    return {
        type: APPLY_CLIENT_STATE,
        state,
    };
}

export const useApplyClientState = () => useAppAction(applyClientState);

export type StateFromServer = 'server';
export type StateFromClient = 'client';
export type StateFrom = StateFromServer | StateFromClient;

export function withClientState<T extends AppReducer<any, any>, S extends ReturnType<T>, R extends S & { stateFrom: StateFrom }>(
    reducer: T extends AppReducer<ReturnType<T> & { stateFrom: any }, any> ? AppReducer<ReturnType<T> & { stateFrom: never }, any> : T,
    namespace: string,
): AppReducer<R> {
    return (state: S, action: Action | ApplyClientStateAction<{ [ns: string]: any }>): R => {
        const childState = reducer(state, action);

        if (isApplyClientStateAction(action)) {
            const action_ = action as ApplyClientStateAction<{ [ns: string]: any }>;
            if (namespace in action_.state) {
                return {
                    ...action_.state[namespace],
                    stateFrom: 'client',
                };
            }
        }

        if ('stateFrom' in childState) {
            return childState;
        }

        return {
            ...childState,
            stateFrom: process.browser ? 'client' : 'server',
        };
    };
}
