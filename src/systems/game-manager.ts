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
        this.backToStartHandler = this.backToStart.bind(this);
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
        this.sceneEl.addEventListener('back-to-start', this.backToStartHandler);

        setTimeout(() => {
            this.router.changeRoute('top-scores');
        }, 2000);
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
        this.sceneEl.removeEventListener(
            'back-to-start',
            this.backToStartHandler,
        );
    },

    startGame() {
        this.gameCycles = 0;
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

    backToStart() {
        this.router.changeRoute('start');
    },
});
