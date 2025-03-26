import { AssertType, IRouter, ISoundComponent } from '@/types/common';
import { config } from '@/config';
import { wrapWithSoundEnabler } from '@/lib/common';
import { GameManagerSystem } from './type';
import { Entity } from 'aframe';

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

    changeRoute(page: string) {
        this.router?.changeRoute(page);
        this.el?.sceneEl?.emit('setPage', { page });
    },

    startGame() {
        this.clearState();
        this.startSounds();
        this.changeRoute(config.pages.Game);
    },

    startSounds: wrapWithSoundEnabler(function () {
        const mainTheme = AssertType<Entity<ISoundComponent>>(
            document.getElementById('main-theme-sound'),
        );
        mainTheme.components.sound.playSound();
    }),

    timerFinished() {
        this.gameCycles++;

        if (this.gameCycles >= 3) {
            return this.changeRoute(config.pages.Scores);
        }

        this.changeRoute(config.pages.Quiz);
    },

    quizFinished() {
        this.changeRoute(config.pages.Game);
    },

    backToStart() {
        this.changeRoute(config.pages.Start);
    },

    scoresSaved() {
        this.changeRoute(config.pages.TopScores);
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

            const uiNode = document.getElementById('ui');
            if (uiNode) {
                uiNode.style.display = 'block';
            }

            this.router?.changeRoute(config.pages.Start);
        });
    },

    controls() {
        this.changeRoute(config.pages.Controls);
    },

    howToPlay() {
        this.changeRoute(config.pages.HowToPlay);
    },
});
