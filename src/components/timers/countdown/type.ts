import { ISoundComponent } from '@/types/common';
import { Entity } from 'aframe';

export interface ICountdownComponent {
    i: ReturnType<typeof setInterval> | null;
    countdownSound: Entity<ISoundComponent> | null;
    // Handlers
    updateTimerHandler: () => void;
    // Methods
    sound: () => void;
    updateTimer: () => void;
    go: () => void;
    hide: () => void;
}
