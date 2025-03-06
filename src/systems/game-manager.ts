import { startPage } from '../config';
import { domUi } from '../lib/dom-ui';

AFRAME.registerSystem('game-manager', {
    router: null,
    domUi,

    init() {
        this.laps = 0;
        this.router = this.el.systems.router;
        // Handlers
        this.startGameHandler = this.startGame.bind(this);
        this.startQuizHandler = this.startQuiz.bind(this);
        // Events
        this.sceneEl.addEventListener('game-start', this.startGameHandler);
        this.sceneEl.addEventListener('quiz-start', this.startQuizHandler);
        // Init
        this.router.changeRoute(startPage);
    },

    remove() {
        this.sceneEl.removeEventListener('game-start', this.startGameHandler);
        this.sceneEl.removeEventListener('quiz-start', this.startQuizHandler);
    },

    startGame() {
        this.router.changeRoute('game');
    },

    startQuiz() {
        this.router.changeRoute('quiz');
    },
});
