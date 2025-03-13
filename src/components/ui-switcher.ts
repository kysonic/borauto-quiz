import { domUi } from '../lib/dom-ui';

AFRAME.registerComponent('ui-switcher', {
    schema: {
        ui: { type: 'string' },
    },

    init() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.vrMode() : this.domMode();

        // Handlers
        this.vrModeHandler = this.vrMode.bind(this);
        this.domModeHandler = this.domMode.bind(this);
        // Events
        this.el.sceneEl.addEventListener('enter-vr', this.vrModeHandler);
        this.el.sceneEl.addEventListener('exit-vr', this.domModeHandler);
    },

    remove() {
        this.el.sceneEl.removeEventListener('enter-vr', this.vrModeHandler);
        this.el.sceneEl.removeEventListener('exit-vr', this.domModeHandler);
    },

    vrMode() {
        this.el.setAttribute('visible', 'true');
        domUi.hideAll();
    },

    domMode() {
        this.el.setAttribute('visible', 'false');
        // domUi.hideAll();
        domUi.changeScreen(this.data.ui);
    },
});
