// So how aframe-state-component (which is system) doesn't support two states (single state tree)
// - we can use one state in Alpine.js
export const DoubleState = (initialState, handlers) => {
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

AFRAME.registerSystem('dom-state', {
    init() {
        this.stateUpdateHandler = this.stateUpdate.bind(this);
        this.sceneEl.addEventListener('stateupdate', this.stateUpdateHandler);
    },

    remove() {
        this.sceneEl.removeEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
    },

    stateUpdate(e) {
        window.Alpine.store('state')?.[e.detail.action]?.(
            window.Alpine.store('state'),
            e.detail.payload,
        );
    },
});
