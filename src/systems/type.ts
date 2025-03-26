import { IRouter } from '@/types/common';

export interface GameManagerSystem {
    router: IRouter | null;
    gameCycles: number;
    trackModel: HTMLElement | null;
    // Handlers
    startGameHandler: () => void;
    timerFinishedHandler: () => void;
    quizFinishedHandler: () => void;
    backToStartHandler: () => void;
    scoresSavedHandler: () => void;
    sceneLoadedHandler: () => void;
    controlsHandler: () => void;
    howToPlayHandler: () => void;
    // Methods
    startGame: () => void;
    timerFinished: () => void;
    quizFinished: () => void;
    backToStart: () => void;
    scoresSaved: () => void;
    sceneLoaded: () => void;
    controls: () => void;
    howToPlay: () => void;
    remove: () => void;
    startSounds: () => void;
    clearState: () => void;
}
