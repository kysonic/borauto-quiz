export interface TimerComponent {
    interval: number;
    time: number;
    i: ReturnType<typeof setInterval> | null;
    domNode: HTMLElement | null;
    vrNode: HTMLElement | null;
    // Handlers
    updateTimerHandler: () => void;
    startHandler: () => void;
    // Methods
    setTime: () => void;
    updateTimer: () => void;
    start: () => void;
}
