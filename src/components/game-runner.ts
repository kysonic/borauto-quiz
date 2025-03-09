AFRAME.registerComponent('game-runner', {
    init() {
        this.car = document.getElementById('car');
        this.confetti = document.getElementById('confetti');
        this.confettiSound = document.getElementById('confetti-sound-e');
        // Handlers
        this.endCycleHandler = this.endCycle.bind(this);
        //Events
        this.el.sceneEl.addEventListener('timer-done', this.endCycleHandler);
    },

    remove() {
        this.el.sceneEl.removeEventListener('timer-done', this.endCycleHandler);
    },

    endCycle() {
        const carPosition = this.car.object3D.position;

        this.car.parentNode.removeChild(this.car);
        this.confettiSound.components.sound.playSound();

        this.confetti.setAttribute(
            'confetti-effect',
            `position: ${carPosition.x} ${carPosition.y} ${carPosition.z}; particleCount: 200; size: 0.01; border: 0.2; gravity: 0.0005; bounce: 0.1`,
        );

        setTimeout(() => {
            this.el.sceneEl.emit('timer-finished');
        }, 2000);
    },
});
