import { UIMode } from '@/types/common';

AFRAME.registerSystem('ui-switcher', {
    vrModeHandler: () => {},
    domModeHandler: () => {},

    schema: {
        ui: { type: 'string' },
    },

    init() {
        this.el?.sceneEl?.is('vr-mode') ? this.vrMode() : this.domMode();

        // Handlers
        this.vrModeHandler = this.vrMode.bind(this);
        this.domModeHandler = this.domMode.bind(this);
        // Events
        this.el?.sceneEl?.addEventListener('enter-vr', this.vrModeHandler);
        this.el?.sceneEl?.addEventListener('exit-vr', this.domModeHandler);
    },

    remove() {
        this.el?.sceneEl?.removeEventListener('enter-vr', this.vrModeHandler);
        this.el?.sceneEl?.removeEventListener('exit-vr', this.domModeHandler);
    },

    vrMode() {
        this.el?.sceneEl?.emit('setUiMode', { mode: UIMode.vr });
    },

    domMode() {
        this.el?.sceneEl?.emit('setUiMode', { mode: UIMode.dom });
    },
});
