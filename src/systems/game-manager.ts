import { startPage } from '../config';
import { domUi } from '../lib/dom-ui';

AFRAME.registerSystem('game-manager', {
    router: null,
    domUi,

    init() {
        this.router = this.el.systems.router;

        this.sceneEl.addEventListener('game-start', this.startGame.bind(this));
        this.sceneEl.addEventListener('enter-vr', this.setVRui.bind(this));
        this.sceneEl.addEventListener('exit-vr', this.setDOMui.bind(this));

        this.router.changeRoute(startPage);
    },

    startGame() {
        this.router.changeRoute('game');
    },

    setVRui() {
        const domNode = document.getElementById(
            `${this.router.data.current}-dom`,
        );
        const vrNode = document.getElementById(
            `${this.router.data.current}-vr`,
        );
        this.domUi.hideNode(domNode);
        vrNode.setAttribute('visible', 'true');
    },

    setDOMui() {
        const domNode = document.getElementById(
            `${this.router.data.current}-dom`,
        );
        const vrNode = document.getElementById(
            `${this.router.data.current}-vr`,
        );
        this.domUi.showNode(domNode);
        vrNode.setAttribute('visible', 'false');
    },
});
