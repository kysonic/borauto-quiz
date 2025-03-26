import { Entity } from 'aframe';

export interface GameRunnerComponent {
    car: Entity | null;
    confetti: Entity | null;
    confettiSound: Entity | null;
    nosList: Entity | null;
    // Handlers
    endCycleHandler: () => void;
    stateUpdateHandler: (e: Event) => void;
    // Methods
    endCycle: () => void;
    stateUpdate: (e: Event) => void;
    renderNitro: () => void;
}
