import { ISoundComponent } from '@/types/common';
import { Entity } from 'aframe';

export interface ICountdownComponent {
    countdown: number;
    i: ReturnType<typeof setInterval> | null;
    countdownDOMNode: HTMLElement | null;
    countdownVRNode: HTMLElement | null;
    countdownNumberDOMNode: HTMLElement | null;
    countdownNumberVRNode: HTMLElement | null;
    countdownGoDOMNode: HTMLElement | null;
    countdownGoVRNode: HTMLElement | null;
    countdownSound: Entity<ISoundComponent> | null;
    // Handlers
    vrModeHandler: () => void;
    domModeHandler: () => void;
    updateTimerHandler: () => void;
    // Methods
    nodes: () => void;
    vrMode: () => void;
    domMode: () => void;
    sound: () => void;
    updateTimer: () => void;
    updateVr: () => void;
    updateDom: () => void;
    go: () => void;
    VRGo: () => void;
    DOMGo: () => void;
    hide: () => void;
    VRClear: () => void;
    DOMClear: () => void;
}
