import { initialState } from '.';

export type StateType = typeof initialState;
export type StateSystem = {
    state: StateType;
};

export type ActionType<T> = Record<string, T>;

export interface IStateUpdateEvent {
    action: string;
    payload: Record<string, unknown>;
}

export interface DomStateSystem {
    stateUpdateHandler: (e: Event) => void;
    stateUpdate: (e: Event) => void;
    remove: () => void;
}
