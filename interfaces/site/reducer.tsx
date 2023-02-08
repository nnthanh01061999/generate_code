export interface IReducerActionPayload {
    key: string;
    type: string;
}

export interface IReducerAction {
    key: string;
    payload: IReducerActionPayload[];
}

export interface IReducerState {
    key: string;
    type: string;
}

export type TReducerFormValues = {
    key: string;
    withClientState: boolean;
    state: IReducerState[];
    actions: IReducerAction[];
};
