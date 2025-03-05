import { controls, gearSettings } from '../config';
import {
    shapePoints,
    shapePoints3D,
    totalPoints,
} from '../primitives/track-points';

AFRAME.registerComponent('car', {
    schema: {},

    init() {
        this.t = 0;
        this.throttle = 0;
        this.speed = 0;
        this.currentGear = 1;
        this.rpm = 800;
        this.isShifting = false;
        this.lastTime = performance.now();
        this.progress = 0;

        this.speedUi = this.el.sceneEl.querySelector('#speed-vr');
        this.gearUi = this.el.sceneEl.querySelector('#gear-vr');
        this.rpmUi = this.el.sceneEl.querySelector('#rpm-vr');

        this.controls();
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

        setTimeout(() => {
            this.isShifting = false;
            this.rpm *= 0.7;
        }, 300);
    },

    tick() {
        const now = performance.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;
        this.updatePhysics(deltaTime);
        this.updatePosition();
        this.updateUi();
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

        // Расчет ускорения
        const accelerationFactor = this.getAccelerationFactor(gear, speedRatio);
        const acceleration =
            gear.peakAcceleration * accelerationFactor * this.throttle;

        // Естественное замедление
        const naturalDeceleration = 2.5 * deltaTime; // 2.5 м/с²

        // Торможение
        if (this.throttle < 0) {
            const brakeForce = 8.0 * deltaTime; // 8 м/с²
            this.speed = Math.max(0, this.speed - brakeForce * 3.6);
        } else if (this.throttle === 0) {
            // Сопротивление качению и аэродинамика
            this.speed = Math.max(0, this.speed - naturalDeceleration * 3.6);
        } else {
            // Интеграция ускорения
            this.speed += acceleration * deltaTime * 3.6;
        }

        // Ограничение скорости для текущей передачи
        this.speed = Math.min(this.speed, gear.maxSpeed);

        // Расчет RPM
        this.rpm = 800 + (this.speed / gear.maxSpeed) * (gear.maxRPM - 800);
        this.rpm = Math.min(this.rpm, gear.maxRPM);
    },

    updatePosition() {
        this.progress += this.speed * 0.025;

        const t = (this.progress % totalPoints) / totalPoints;
        const currentIndex = Math.floor(t * totalPoints);
        const nextIndex = (currentIndex + 1) % totalPoints;

        // Интерполяция позиции
        const point = shapePoints3D[currentIndex];
        const nextPoint = shapePoints3D[nextIndex];
        const alpha = t * totalPoints - currentIndex;

        this.el.object3D.position.lerpVectors(point, nextPoint, alpha);

        // Плавный поворот
        // Расчет направления движения
        const deltaX = nextPoint.x - point.x;
        const deltaZ = nextPoint.z - point.z;

        this.el.object3D.rotation.y = Math.atan2(deltaX, deltaZ);
    },

    updateUi() {
        // document.getElementById('speed').textContent = Math.floor(
        //     this.speed,
        // ).toString();
        // document.getElementById('gear').textContent = this.currentGear;
        // document.getElementById('rpm').textContent = Math.floor(
        //     this.rpm,
        // ).toString();
        // document.querySelector('.rpm-fill').style.width = `${
        //     (this.rpm / 6500) * 100
        // }%`;
        // this.speedUi.setAttribute('text', { value: Math.floor(this.speed) });
        // this.gearUi.setAttribute('text', { value: this.currentGear });
        // this.rpmUi.setAttribute('text', { value: Math.floor(this.rpm) });
    },
});
