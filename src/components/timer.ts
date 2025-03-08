AFRAME.registerComponent('timer', {
    init() {
        this.interval = 1000;
        // 30s by default
        this.setTime();
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
        if (!this.i) {
            this.i = setInterval(this.updateHandler, this.interval);
        }
    },

    remove() {
        this.el.sceneEl.removeEventListener(
            'countdown-finished',
            this.startHandler,
        );
        clearInterval(this.i);
        this.i = null;
    },

    setTime() {
        this.time = 30 * 1000 + 1000;
    },

    update() {
        this.time -= this.interval;

        this.el.sceneEl.emit('setTime', { time: this.time });

        if (this.time <= 0) {
            clearInterval(this.i);
            this.i = null;
            this.setTime();
            this.el.sceneEl.emit('timer-finished');
        }
    },
});
