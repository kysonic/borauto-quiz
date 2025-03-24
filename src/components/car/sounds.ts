export const SoundsMixin = {
    initSounds() {
        //
        this.gasSoundStarted = false;
        // Nodes
        this.idleSound = document.getElementById('idle-sound-e');
        this.startSound = document.getElementById('start-sound-e');
        this.gearboxSound = document.getElementById('gearbox-sound-e');
        this.gasStartSound = document.getElementById('gas-start-e');
        this.gasTopSound = document.getElementById('gas-top-e');
        // this.gasTopIdleSound = document.getElementById('gas-top-idle-sound-e');
        this.gasGearSound = document.getElementById('gas-gear-e');
        this.nitroSound = document.getElementById('nitro-sound-e');
    },

    removeSounds() {
        this.idleSound.components.sound.stopSound();
        this.startSound.components.sound.stopSound();
        this.gearboxSound.components.sound.stopSound();
        this.gasStartSound.components.sound.stopSound();
        this.gasTopSound.components.sound.stopSound();
        this.gasGearSound.components.sound.stopSound();
        this.nitroSound.components.sound.stopSound();
    },

    startSounds() {
        const enabled = this.el.sceneEl.systems.state.state.soundEnabled;
        if (!enabled) {
            return false;
        }
        setTimeout(() => {
            this.startSound.components.sound.playSound();

            setTimeout(() => {
                this.idleSound.components.sound.playSound();
            }, 1000);
        }, 500);
    },

    startGasSound() {
        const enabled = this.el.sceneEl.systems.state.state.soundEnabled;
        if (!enabled) {
            return false;
        }
        if (!this.gasSoundStarted) {
            this.gasSoundStarted = true;
            this.gasStartSound.components.sound.playSound();

            setTimeout(() => {
                this.gasTopSound.components.sound.playSound();
            }, 500);
        }
    },

    startNitroSound() {
        const enabled = this.el.sceneEl.systems.state.state.soundEnabled;
        if (!enabled) {
            return false;
        }
        this.nitroSound.components.sound.playSound();
    },

    stopGasSound() {
        this.gasSoundStarted = false;
        this.gasTopSound.components.sound.stopSound();
        // this.gasTopIdleSound.components.sound.stopSound();
    },

    gearSound() {
        const enabled = this.el.sceneEl.systems.state.state.soundEnabled;
        if (!enabled) {
            return false;
        }
        this.gearboxSound.components.sound.playSound();
        this.gasTopSound.components.sound.stopSound();
        // this.gasTopIdleSound.components.sound.stopSound();

        setTimeout(() => {
            this.gasSoundStarted = false;
            this.gasGearSound.components.sound.playSound();
            this.startGasSound();
        }, 100);
    },
};
