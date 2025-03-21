import { Font, maxNitro } from '../config';
import { createHTMLFromString } from '../lib/dom';

AFRAME.registerComponent('game-runner', {
    init() {
        this.car = document.getElementById('car');
        this.confetti = document.getElementById('confetti');
        this.confettiSound = document.getElementById('confetti-sound-e');
        this.nosList = document.getElementById('nos-list');
        // Handlers
        this.endCycleHandler = this.endCycle.bind(this);
        this.stateUpdateHandler = this.stateUpdate.bind(this);
        //Events
        this.el.sceneEl.addEventListener('timer-done', this.endCycleHandler);
        this.el.sceneEl.addEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
        // Init
        this.renderNitro();
    },

    remove() {
        this.el.sceneEl.removeEventListener('timer-done', this.endCycleHandler);
        this.el.sceneEl.removeEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
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

    stateUpdate(e) {
        const action = e.detail.action;
        // Because a-frame-state cannot handle arrays
        if (['setNitro', 'useNitro', 'increaseNitro'].includes(action)) {
            this.renderNitro();
        }
    },

    renderNitro() {
        // Clear container
        this.nosList.innerHTML = '';
        // Get state
        const nitro = this.el.sceneEl.systems['state'].state.nitro;
        // Render list
        for (let i = 0; i <= maxNitro; i++) {
            const x = i * 0.03 - 0.119;
            const img = i < nitro ? '#nos-active' : '#nos';

            this.nosList.appendChild(
                createHTMLFromString(/*html*/ `
                            <a-entity>
                                <a-image position="${x} 0.05 0.02" width="0.03" height="0.03" rotation="0 0 0" src="${img}"></a-image>
                            </a-entity>
                        `),
            );
        }
    },
});
