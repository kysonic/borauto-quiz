import { AssertType, IRouter } from '@/types/common';
import { GameManagerSystem } from './type';
import { StateSystem } from '@/states/type';

AFRAME.registerSystem<GameManagerSystem>('game-manager', {
    router: null,
    gameCycles: 0,
    trackModel: null,

    startGameHandler: () => {},
    timerFinishedHandler: () => {},
    quizFinishedHandler: () => {},
    backToStartHandler: () => {},
    scoresSavedHandler: () => {},
    sceneLoadedHandler: () => {},
    controlsHandler: () => {},
    howToPlayHandler: () => {},

    init() {
        this.gameCycles = 0;
        this.router = AssertType<IRouter>(this.el?.sceneEl?.systems.router);
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
        this.el?.sceneEl?.addEventListener('game-start', this.startGameHandler);
        this.el?.sceneEl?.addEventListener(
            'timer-finished',
            this.timerFinishedHandler,
        );
        this.el?.sceneEl?.addEventListener(
            'quiz-finished',
            this.quizFinishedHandler,
        );
        this.el?.sceneEl?.addEventListener(
            'scores-saved',
            this.scoresSavedHandler,
        );
        this.el?.sceneEl?.addEventListener(
            'back-to-start',
            this.backToStartHandler,
        );
        this.el?.sceneEl?.addEventListener('loaded', this.sceneLoadedHandler);
        this.el?.sceneEl?.addEventListener(
            'controls-start',
            this.controlsHandler,
        );
        this.el?.sceneEl?.addEventListener(
            'how-to-play-start',
            this.howToPlayHandler,
        );
    },

    remove() {
        this.el?.sceneEl?.removeEventListener(
            'game-start',
            this.startGameHandler,
        );
        this.el?.sceneEl?.removeEventListener(
            'timer-finished',
            this.timerFinishedHandler,
        );
        this.el?.sceneEl?.removeEventListener(
            'quiz-finished',
            this.quizFinishedHandler,
        );
        this.el?.sceneEl?.removeEventListener(
            'scores-saved',
            this.scoresSavedHandler,
        );
        this.el?.sceneEl?.removeEventListener(
            'back-to-start',
            this.backToStartHandler,
        );
    },

    startSounds() {
        const enabled = AssertType<StateSystem>(this.el?.sceneEl?.systems.state)
            .state.soundEnabled;
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
        this.router?.changeRoute('game');
    },

    timerFinished() {
        this.gameCycles++;

        if (this.gameCycles >= 3) {
            return this.router?.changeRoute('scores');
        }

        this.router?.changeRoute('quiz');
    },

    quizFinished() {
        this.router?.changeRoute('game');
    },

    backToStart() {
        this.router?.changeRoute('start');
    },

    scoresSaved() {
        this.router?.changeRoute('top-scores');
    },

    clearState() {
        this.gameCycles = 0;
        this.el?.sceneEl?.emit('setNitro', { nitro: 1 });
        this.el?.sceneEl?.emit('setLaps', { laps: 0 });
    },

    sceneLoaded() {
        this.trackModel = document.getElementById('track-model');
        this.trackModel?.addEventListener('model-loaded', () => {
            const loadingNode = document.getElementById('loading-dom');
            if (loadingNode) {
                loadingNode.style.display = 'none';
            }

            this.router?.changeRoute('start');
        });
    },

    controls() {
        this.router?.changeRoute('controls');
    },

    howToPlay() {
        this.router?.changeRoute('how-to-play');
    },
});
