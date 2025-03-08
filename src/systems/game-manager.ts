import { startPage } from '../config';
import { domUi } from '../lib/dom-ui';

AFRAME.registerSystem('game-manager', {
    router: null,
    domUi,

    init() {
        this.gameCycles = 0;
        this.router = this.el.systems.router;
        // Handlers
        this.startGameHandler = this.startGame.bind(this);
        this.timerFinishedHandler = this.timerFinished.bind(this);
        this.quizFinishedHandler = this.quizFinished.bind(this);
        // Events
        this.sceneEl.addEventListener('game-start', this.startGameHandler);
        this.sceneEl.addEventListener(
            'timer-finished',
            this.timerFinishedHandler,
        );
        this.sceneEl.addEventListener(
            'quiz-finished',
            this.quizFinishedHandler,
        );
        // Init
        setTimeout(() => {
            this.router.changeRoute(startPage);
        }, 1000);
    },

    remove() {
        this.sceneEl.removeEventListener('game-start', this.startGameHandler);
        this.sceneEl.removeEventListener(
            'timer-finished',
            this.timerFinishedHandler,
        );
        this.sceneEl.removeEventListener(
            'quiz-finished',
            this.quizFinishedHandler,
        );
    },

    startGame() {
        this.router.changeRoute('game');
    },

    timerFinished() {
        this.gameCycles++;

        if (this.gameCycles >= 3) {
            return this.router.changeRoute('scores');
        }

        this.router.changeRoute('quiz');
    },

    quizFinished() {
        this.router.changeRoute('game');
    },
});
