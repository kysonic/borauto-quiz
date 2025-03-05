import { domUi } from '../lib/dom-ui';

AFRAME.registerComponent('ui', {
    schema: {
        ui: { type: 'string' },
    },

    init() {
        const isInXR =
            this.el.sceneEl.is('vr-mode') || this.el.sceneEl.is('ar-mode');
        isInXR ? this.vrMode() : this.domMode();
    },

    vrMode() {
        this.el.setAttribute('visible', 'true');
        domUi.hideAll();
    },

    domMode() {
        this.el.setAttribute('visible', 'false');
        domUi.changeScreen(this.data.ui);
    },
});
