import { TimerComponent } from './type';

AFRAME.registerComponent<TimerComponent>('timer', {
    interval: 1000,
    time: 0,
    i: null,
    domNode: null,
    vrNode: null,

    updateTimerHandler: () => {},
    startHandler: () => {},

    init() {
        this.interval = 1000;
        // 30s by default
        this.setTime();
        // Nodes
        this.domNode = document.getElementById('timer-number-dom');
        this.vrNode = document.getElementById('timer-number-vr');
        // Handlers
        this.updateTimerHandler = this.updateTimer.bind(this);
        this.startHandler = this.start.bind(this);
        // Events
        this.el?.sceneEl?.addEventListener(
            'countdown-finished',
            this.startHandler,
        );
    },

    start() {
        if (!this.i) {
            this.i = setInterval(this.updateTimerHandler, this.interval);
        }
    },

    remove() {
        this.el?.sceneEl?.removeEventListener(
            'countdown-finished',
            this.startHandler,
        );
        if (this.i) {
            clearInterval(this.i);
            this.i = null;
        }
    },

    setTime() {
        this.time = 30 * 1000 + 1000;
    },

    updateTimer() {
        this.time -= this.interval;

        this.el?.sceneEl?.emit('setTime', { time: this.time });

        if (this.time <= 0) {
            if (this.i) {
                clearInterval(this.i);
                this.i = null;
            }

            this.el?.sceneEl?.emit('timer-done');
        }
    },
});
