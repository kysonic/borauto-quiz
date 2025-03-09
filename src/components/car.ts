import { controls, gearSettings, nitroMultiplayer } from '../config';
import { shapePoints3D, totalPoints } from '../primitives/track-points';

const pointsLength = 10;
const dropPoints = [pointsLength + 1, pointsLength + pointsLength + 1];
const lapPoints = [0, pointsLength];

AFRAME.registerComponent('car', {
    schema: {},

    init() {
        this.enabled = false;
        this.gasSoundStarted = false;
        this.nitro = false;
        this.t = 0;
        this.isLapping = true;
        this.throttle = 0;
        this.speed = 0;
        this.currentGear = 1;
        this.rpm = 800;
        this.isShifting = false;
        this.lastTime = performance.now();
        this.progress = 0;
        // Sounds
        this.sounds();
        // Controls
        this.controls();
        // Handlers
        this.enableCarHandler = this.enableCar.bind(this);
        this.clearHandler = this.clear.bind(this);
        // Events
        this.el.sceneEl.addEventListener(
            'countdown-finished',
            this.enableCarHandler,
        );
        // Init
        this.updatePhysics(0);
        this.updatePosition();
        this.clear();
        // Render dom state
        const isInVR = this.el.sceneEl.is('vr-mode');
        !isInVR && this.renderDom();
        // Start
        this.start();
    },

    sounds() {
        // Sounds
        this.idleSound = document.getElementById('idle-sound-e');
        this.startSound = document.getElementById('start-sound-e');
        this.gearboxSound = document.getElementById('gearbox-sound-e');
        this.gasStartSound = document.getElementById('gas-start-e');
        this.gasTopSound = document.getElementById('gas-top-e');
        // this.gasTopIdleSound = document.getElementById('gas-top-idle-sound-e');
        this.gasGearSound = document.getElementById('gas-gear-e');
        this.nitroSound = document.getElementById('nitro-sound-e');
    },

    start() {
        // Sounds
        setTimeout(() => {
            this.startSound.components.sound.playSound();

            setTimeout(() => {
                this.idleSound.components.sound.playSound();
            }, 1000);
        }, 500);
    },

    renderDom() {
        this.el.sceneEl.systems['dom-state'].renderStateHandler('useNitro');
    },

    controls() {
        // Handlers
        this.keydownHandler = this.onKeyDown.bind(this);
        this.keyupHandler = this.onKeyUp.bind(this);

        window.addEventListener('keydown', this.keydownHandler);
        window.addEventListener('keyup', this.keyupHandler);

        this.rightController =
            this.el.sceneEl.querySelector('#right-controller');

        this.rightController.addEventListener('triggerdown', () => {
            this.throttle = 1;
            this.startGasSound();
        });
        this.rightController.addEventListener('triggerup', () => {
            this.throttle = 0;
            this.stopGasSound();
        });
        this.rightController.addEventListener('gripdown', () => {
            this.throttle = -1;
        });
        this.rightController.addEventListener('gripup', () => {
            this.throttle = 0;
        });

        this.rightController.addEventListener('thumbstickmoved', (evt) => {
            const { y } = evt.detail;

            if (y > 0.5) {
                this.shiftGear(false);
            } else if (y < -0.5) {
                this.shiftGear(true);
            }
        });
    },

    remove() {
        this.el.sceneEl.removeEventListener(
            'countdown-finished',
            this.enableCarHandler,
        );

        this.clearControls();
        this.stopSounds();
    },

    clearControls() {
        window.removeEventListener('keydown', this.keydownHandler);
        window.removeEventListener('keyup', this.keyupHandler);
    },

    onKeyDown(e) {
        if (!this.enabled) {
            return false;
        }

        switch (e.code) {
            case controls.desktop.accelerate:
                this.throttle = 1;
                this.startGasSound();
                break;
            case controls.desktop.break:
                this.throttle = -1;
                break;
            case controls.desktop.gearUp:
                this.shiftGear(true);
                break;
            case controls.desktop.gearDown:
                this.shiftGear(false);
                break;
            case controls.desktop.nitro:
                this.useNitro();
                break;
        }
    },

    onKeyUp(e) {
        if (
            e.code === controls.desktop.accelerate ||
            e.code === controls.desktop.break
        ) {
            this.throttle = 0;
            this.stopGasSound();
        }
    },

    shiftGear(up) {
        if (this.isShifting) return;
        const newGear = this.currentGear + (up ? 1 : -1);

        if (newGear < 1 || newGear > 5) return;

        this.isShifting = true;
        this.currentGear = newGear;
        this.sendGear();
        this.gearSound();

        setTimeout(() => {
            this.isShifting = false;
            this.rpm *= 0.7;
        }, 300);
    },

    tick() {
        const now = performance.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;

        if (this.enabled) {
            this.updatePhysics(deltaTime);
            this.updatePosition();
            this.sendEvents();
        }
    },

    getAccelerationFactor(gear, speedRatio) {
        const curve = gear.curve;
        const segments = curve.length - 2;
        const position = speedRatio * segments;
        const index = Math.min(Math.floor(position), segments);
        const fraction = position - index;

        const factor =
            curve[index] * (1 - fraction) + curve[index + 1] * fraction;

        return factor;
    },

    updatePhysics(deltaTime) {
        const gear = gearSettings[this.currentGear];
        const speedRatio = this.speed / gear.maxSpeed;

        const multiplayer = this.nitro ? nitroMultiplayer : 1;
        // Calculate acceleration
        const accelerationFactor = this.getAccelerationFactor(gear, speedRatio);
        const peakAcceleration = this.nitro
            ? Math.max(gear.peakAcceleration, 1.5)
            : gear.peakAcceleration;
        const acceleration =
            peakAcceleration * accelerationFactor * this.throttle * multiplayer;

        // Natural delay
        const naturalDeceleration = 2.5 * deltaTime; // 2.5 м/s²

        // Breaking
        if (this.throttle < 0) {
            const brakeForce = 8.0 * deltaTime; // 8 м/s²
            this.speed = Math.max(0, this.speed - brakeForce * 3.6);
        } else if (this.throttle === 0) {
            // Air resistance
            this.speed = Math.max(0, this.speed - naturalDeceleration * 3.6);
        } else {
            // Acceleration integration
            this.speed += acceleration * deltaTime * multiplayer * 3.6;
        }

        // Speed limitation
        // this.speed = Math.min(this.speed, gear.maxSpeed);

        // RPM calculation
        this.rpm =
            800 +
            (this.speed / gear.maxSpeed) * (gear.maxRPM - 800) * multiplayer;
        this.rpm = Math.min(this.rpm, gear.maxRPM);
    },

    updatePosition() {
        this.progress += this.speed * 0.025;

        const t = (this.progress % totalPoints) / totalPoints;
        const currentIndex = Math.floor(t * totalPoints);
        const nextIndex = (currentIndex + 1) % totalPoints;

        // Position interpolation
        const point = shapePoints3D[currentIndex];
        const nextPoint = shapePoints3D[nextIndex];
        const alpha = t * totalPoints - currentIndex;

        this.el.object3D.position.lerpVectors(point, nextPoint, alpha);

        // Turn
        const deltaX = nextPoint.x - point.x;
        const deltaZ = nextPoint.z - point.z;

        this.el.object3D.rotation.y = Math.atan2(deltaX, deltaZ);

        // Laps
        if (
            currentIndex > lapPoints[0] &&
            currentIndex <= lapPoints[1] &&
            !this.isLapping
        ) {
            this.isLapping = true;
            this.el.sceneEl.emit('increaseLaps', { amount: 1 });
        }

        if (currentIndex > dropPoints[0] && currentIndex <= dropPoints[1]) {
            this.isLapping = false;
        }
    },

    sendEvents() {
        this.el.sceneEl.emit('setSpeed', { speed: this.speed });
        this.el.sceneEl.emit('setRpm', { rpm: this.rpm });
    },

    sendGear() {
        this.el.sceneEl.emit('setGear', { gear: this.currentGear });
    },

    enableCar() {
        this.enabled = true;
    },

    clear() {
        this.currentGear = 1;
        this.speed = 0;
        this.rpm = 800;

        this.sendEvents();
        this.sendGear();
    },

    useNitro() {
        const nitro = this.el.sceneEl.systems['state'].state.nitro;

        if (!this.nitro && nitro > 0) {
            this.el.sceneEl.emit('useNitro');
            this.nitro = true;
            this.startNitroSound();

            setTimeout(() => {
                this.nitro = false;
            }, 1000);
        }
    },

    startGasSound() {
        if (!this.gasSoundStarted) {
            this.gasSoundStarted = true;
            this.gasStartSound.components.sound.playSound();

            setTimeout(() => {
                this.gasTopSound.components.sound.playSound();

                // setTimeout(() => {
                //     this.gasTopIdleSound.components.sound.playSound();
                // }, 3000);
            }, 500);
        }
    },

    startNitroSound() {
        this.nitroSound.components.sound.playSound();
    },

    stopGasSound() {
        this.gasSoundStarted = false;
        this.gasTopSound.components.sound.stopSound();
        // this.gasTopIdleSound.components.sound.stopSound();
    },

    gearSound() {
        this.gearboxSound.components.sound.playSound();
        this.gasTopSound.components.sound.stopSound();
        // this.gasTopIdleSound.components.sound.stopSound();

        setTimeout(() => {
            this.gasSoundStarted = false;
            this.gasGearSound.components.sound.playSound();
            this.startGasSound();
        }, 100);
    },

    stopSounds() {
        this.idleSound.components.sound.stopSound();
        this.startSound.components.sound.stopSound();
        this.gearboxSound.components.sound.stopSound();
        this.gasStartSound.components.sound.stopSound();
        this.gasTopSound.components.sound.stopSound();
        this.gasGearSound.components.sound.stopSound();
        this.nitroSound.components.sound.stopSound();
    },
});
