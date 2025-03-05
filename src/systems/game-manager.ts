import { startPage } from '../config';
import { domUi } from '../lib/dom-ui';

AFRAME.registerSystem('game-manager', {
    router: null,
    domUi,

    init() {
        this.router = this.el.systems.router;

        this.sceneEl.addEventListener('game-start', this.startGame.bind(this));

        this.router.changeRoute(startPage);
        // setTimeout(() => {
        //     this.sceneEl.dispatchEvent(new CustomEvent('game-start'));
        // }, 1000);
    },

    startGame() {
        this.router.changeRoute('game');
    },
});
