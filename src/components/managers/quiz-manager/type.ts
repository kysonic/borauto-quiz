import type { Entity } from 'aframe';

export interface IAnswerEvent {
    answer: number;
}

export interface IQuizManagerComponent {
    answered: boolean;
    yeapSound: Entity | null;
    nopeSound: Entity | null;
    //Handlers
    answerHandler: (e: Event) => void;
    // Methods
    answer: (e: Event) => void;
    takeQuestion: () => void;
    success: (answer: number) => void;
    fail: (answer: number, correct: number) => void;
    answeredQuestion: (answer: number, correct: number) => void;
    playYeapSound: () => void;
    playNopeSound: () => void;
}
