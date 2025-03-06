import { controls, gearSettings } from '../config';
import { shapePoints3D, totalPoints } from '../primitives/track-points';

const pointsLength = 10;
const dropPoints = [pointsLength + 1, pointsLength + pointsLength + 1];
const lapPoints = [0, pointsLength];

AFRAME.registerComponent('car', {
    schema: {},

    init() {
        this.enabled = true;
        this.t = 0;
        this.isLapping = true;
        this.throttle = 0;
        this.speed = 0;
        this.currentGear = 1;
        this.rpm = 800;
        this.isShifting = false;
        this.lastTime = performance.now();
        this.progress = 0;
        // Controls
        this.controls();
        // Initial position
        this.updatePhysics(0);
        this.updatePosition();
        // Events
        this.el.sceneEl.addEventListener(
            'countdown-finished',
            this.enableCar.bind(this),
        );
    },

    controls() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));

        this.rightController =
            this.el.sceneEl.querySelector('#right-controller');

        this.rightController.addEventListener('triggerdown', () => {
            this.throttle = 1;
        });
        this.rightController.addEventListener('triggerup', () => {
            this.throttle = 0;
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

    onKeyDown(e) {
        switch (e.code) {
            case controls.desktop.accelerate:
                this.throttle = 1;
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
        }
    },

    onKeyUp(e) {
        if (
            e.code === controls.desktop.accelerate ||
            e.code === controls.desktop.break
        ) {
            this.throttle = 0;
        }
    },

    shiftGear(up) {
        if (this.isShifting) return;
        const newGear = this.currentGear + (up ? 1 : -1);

        if (newGear < 1 || newGear > 5) return;

        this.isShifting = true;
        this.currentGear = newGear;
        this.el.sceneEl.emit('setGear', { gear: this.currentGear });

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

        // Calculate acceleration
        const accelerationFactor = this.getAccelerationFactor(gear, speedRatio);
        const acceleration =
            gear.peakAcceleration * accelerationFactor * this.throttle;

        // Natural delay
        const naturalDeceleration = 2.5 * deltaTime; // 2.5 м/с²

        // Breaking
        if (this.throttle < 0) {
            const brakeForce = 8.0 * deltaTime; // 8 м/с²
            this.speed = Math.max(0, this.speed - brakeForce * 3.6);
        } else if (this.throttle === 0) {
            // Air resistance
            this.speed = Math.max(0, this.speed - naturalDeceleration * 3.6);
        } else {
            // Acceleration integration
            this.speed += acceleration * deltaTime * 3.6;
        }

        // Speed limitation
        // this.speed = Math.min(this.speed, gear.maxSpeed);

        // RPM calculation
        this.rpm = 800 + (this.speed / gear.maxSpeed) * (gear.maxRPM - 800);
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

    enableCar() {
        this.enabled = true;
    },
});
