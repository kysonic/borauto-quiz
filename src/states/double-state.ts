import { DomStateSystem, IStateUpdateEvent } from './type';

// So how aframe-state-component (which is system) doesn't support two states (single state tree)
// - we can use one state in Alpine.js
export const DoubleState = (
    initialState: Record<string, unknown>,
    handlers: Record<string, Function>,
) => {
    AFRAME.registerState({
        initialState,
        handlers,
    });

    document.addEventListener('alpine:init', () => {
        window.Alpine.store('state', {
            ...initialState,
            ...handlers,
        });
    });
};

AFRAME.registerSystem<DomStateSystem>('dom-state', {
    stateUpdateHandler: () => {},

    init() {
        this.stateUpdateHandler = this.stateUpdate.bind(this);
        this.el?.sceneEl?.addEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
    },

    remove() {
        this.el?.sceneEl?.removeEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
    },

    stateUpdate(e) {
        const customEvent = e as CustomEvent<IStateUpdateEvent>;

        window.Alpine.store('state')?.[customEvent.detail.action]?.(
            window.Alpine.store('state'),
            customEvent.detail.payload,
        );
    },
});
