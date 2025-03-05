import { formatTime } from '../lib/time';

AFRAME.registerComponent('timer', {
    init() {
        this.interval = 1000;
        // 30s by default
        this.time = 30 * 1000 + 1000;
        // Nodes
        this.domNode = document.getElementById('timer-number-dom');
        this.vrNode = document.getElementById('timer-number-vr');
        // Handlers
        this.updateHandler = this.update.bind(this);
        this.startHandler = this.start.bind(this);
        // Events
        this.el.sceneEl.addEventListener(
            'countdown-finished',
            this.startHandler,
        );
    },

    start() {
        this.i = setInterval(this.updateHandler, this.interval);
    },

    remove() {
        clearInterval(this.i);
    },

    update() {
        this.time -= this.interval;

        const isInVR = this.el.sceneEl.is('vr-mode');
        !isInVR ? this.updateVr() : this.updateDom();

        if (this.time <= 0) {
            clearInterval(this.i);
            this.el.sceneEl.emit('timer-finished');
        }
    },

    updateVr() {
        this.vrNode.setAttribute('value', formatTime(this.time));
    },

    updateDom() {
        this.domNode.textContent = formatTime(this.time);
    },
});
