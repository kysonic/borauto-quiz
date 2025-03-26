import {
    AvailableGears,
    gearSettings,
    GearType,
    maxGear,
    minGear,
    nitroMultiplayer,
} from '@/config';
import { throttle } from '@/lib/common';
import { shapePoints3D, totalPoints } from '@/primitives/track/track-points';
import { StateSystem } from '@/states/type';
import { AssertType } from '@/types/common';
import { ControlsMixin } from './controls';
import { SoundsMixin } from './sounds';
import { ICarExtended } from './types';

const pointsLength = 10;
const dropPoints = [pointsLength + 1, pointsLength + pointsLength + 1];
const lapPoints = [0, pointsLength];

const SPEED_COIF = 2.5;

AFRAME.registerComponent<ICarExtended>('car', {
    schema: {},

    enabled: false,
    nitro: false,
    t: 0,
    isLapping: true,
    throttle: 0,
    speed: 0,
    currentGear: 1,
    rpm: 800,
    isShifting: false,
    progress: 0,

    enableCarHandler: () => {},
    clearHandler: () => {},
    sendEventsThrottled: () => {},

    init() {
        // Setup
        this.initSounds();
        this.el?.sceneEl?.is('vr-mode')
            ? this.setupVrControls()
            : this.setupDomControls();
        // Handlers
        this.enableCarHandler = this.enableCar.bind(this);
        this.clearHandler = this.clear.bind(this);
        this.sendEventsThrottled = throttle(() => this.sendEvents(), 40);
        // Events
        this.el?.sceneEl?.addEventListener(
            'countdown-finished',
            this.enableCarHandler,
        );
        // Init
        this.updatePhysics(0);
        this.updatePosition(0);
        this.clear();
        this.startSounds();
    },

    remove() {
        // Events
        this.el?.sceneEl?.removeEventListener(
            'countdown-finished',
            this.enableCarHandler,
        );
        // On remove
        this.removeSounds();
        this.el?.sceneEl?.is('vr-mode')
            ? this.clearVrControls()
            : this.clearDomControls();
    },

    tick(time, timeDelta) {
        const deltaTime = timeDelta / 1000;

        if (this.enabled) {
            this.updatePhysics(deltaTime);
            this.updatePosition(deltaTime);
            this.sendEventsThrottled();
        }
    },

    accelerate() {
        this.throttle = 1;
        this.startGasSound();
    },

    break() {
        this.throttle = -1;
    },

    leave() {
        this.throttle = 0;
        this.stopGasSound();
    },

    shiftGear(up: boolean) {
        if (this.isShifting) {
            return false;
        }

        const newGear = (this.currentGear + (up ? 1 : -1)) as AvailableGears;

        if (newGear < minGear || newGear > maxGear) {
            return false;
        }

        this.isShifting = true;
        this.currentGear = newGear;
        this.sendGear();
        this.gearSound();

        setTimeout(() => {
            this.isShifting = false;
            this.rpm *= 0.7;
        }, 500);
    },

    getAccelerationFactor(gear: GearType, speedRatio: number) {
        const curve = gear.curve;
        const segments = curve.length - 2;
        const position = speedRatio * segments;
        const index = Math.min(Math.floor(position), segments);
        const fraction = position - index;

        const factor =
            curve[index] * (1 - fraction) + curve[index + 1] * fraction;

        return factor;
    },

    updatePhysics(deltaTime: number) {
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

    updatePosition(deltaTime: number) {
        this.progress += this.speed * deltaTime * SPEED_COIF;

        const t = (this.progress % totalPoints) / totalPoints;
        const currentIndex = Math.floor(t * totalPoints);
        const nextIndex = (currentIndex + 1) % totalPoints;

        // Position interpolation
        const point = shapePoints3D[currentIndex];
        const nextPoint = shapePoints3D[nextIndex];
        const alpha = t * totalPoints - currentIndex;

        this.el?.object3D.position.lerpVectors(point, nextPoint, alpha);

        // Turn
        const deltaX = nextPoint.x - point.x;
        const deltaZ = nextPoint.z - point.z;
        // If null the rotation would be incorrect
        if (this.el?.object3D.rotation.y && Math.atan2(deltaX, deltaZ)) {
            this.el.object3D.rotation.y = Math.atan2(deltaX, deltaZ);
        }
        // Laps counting
        if (
            currentIndex > lapPoints[0] &&
            currentIndex <= lapPoints[1] &&
            !this.isLapping
        ) {
            this.isLapping = true;
            this.el?.sceneEl?.emit('increaseLaps', { amount: 1 });
        }

        if (currentIndex > dropPoints[0] && currentIndex <= dropPoints[1]) {
            this.isLapping = false;
        }
    },

    sendEvents() {
        this.el?.sceneEl?.emit('setSpeed', { speed: this.speed });
        this.el?.sceneEl?.emit('setRpm', { rpm: this.rpm });
    },

    sendGear() {
        this.el?.sceneEl?.emit('setGear', { gear: this.currentGear });
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
        const stateSystem = AssertType<StateSystem>(
            this.el?.sceneEl?.systems['state'],
        );
        const nitro = stateSystem.state.nitro;

        if (!this.nitro && nitro > 0 && this.enabled) {
            this.el?.sceneEl?.emit('useNitro');
            this.nitro = true;
            this.startNitroSound();

            setTimeout(() => {
                this.nitro = false;
            }, 1000);
        }
    },

    ...ControlsMixin,
    ...SoundsMixin,
});
