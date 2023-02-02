import { Action } from 'redux';

export type AppReducer<T extends object, A extends Action = Action> = (state: T, action: A) => T;

export type Fn<R = any> = (...args: any[]) => R;

export type AppReducerStateType<T extends AppReducer<any, any>> = T extends AppReducer<infer R, any> ? R : any;
