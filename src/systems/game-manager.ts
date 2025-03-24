import { domUi } from '../lib/dom-ui';

AFRAME.registerSystem('game-manager', {
    router: null,
    domUi,

    init() {
        this.paused = 0;
        this.gameCycles = 0;
        this.router = this.el.systems.router;
        // Handlers
        this.startGameHandler = this.startGame.bind(this);
        this.timerFinishedHandler = this.timerFinished.bind(this);
        this.quizFinishedHandler = this.quizFinished.bind(this);
        this.backToStartHandler = this.backToStart.bind(this);
        this.scoresSavedHandler = this.scoresSaved.bind(this);
        this.sceneLoadedHandler = this.sceneLoaded.bind(this);
        this.controlsHandler = this.controls.bind(this);
        this.howToPlayHandler = this.howToPlay.bind(this);
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
        this.sceneEl.addEventListener('scores-saved', this.scoresSavedHandler);
        this.sceneEl.addEventListener('back-to-start', this.backToStartHandler);
        this.sceneEl.addEventListener('loaded', this.sceneLoadedHandler);
        this.sceneEl.addEventListener('controls-start', this.controlsHandler);
        this.sceneEl.addEventListener(
            'how-to-play-start',
            this.howToPlayHandler,
        );
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
            'scores-saved',
            this.scoresSavedHandler,
        );
        this.sceneEl.removeEventListener(
            'back-to-start',
            this.backToStartHandler,
        );
        window.removeEventListener('mousemove', this.onGestureHandler);
    },

    startSounds() {
        const enabled = this.sceneEl.systems.state.state.soundEnabled;
        if (enabled) {
            const mainTheme = document.getElementById(
                'main-theme-sound',
            ) as any;
            mainTheme.components.sound.playSound();
        }
    },

    startGame() {
        this.clearState();
        this.startSounds();
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

    scoresSaved() {
        this.router.changeRoute('top-scores');
    },

    clearState() {
        this.gameCycles = 0;
        this.sceneEl.emit('setNitro', { nitro: 1 });
        this.sceneEl.emit('setLaps', { laps: 0 });
    },

    sceneLoaded() {
        this.trackModel = document.getElementById('track-model');
        this.trackModel.addEventListener('model-loaded', () => {
            this.router.changeRoute('start');
            document.getElementById('loading-dom').style.display = 'none';
        });
    },

    controls() {
        this.router.changeRoute('controls');
    },

    howToPlay() {
        this.router.changeRoute('how-to-play');
    },
});
