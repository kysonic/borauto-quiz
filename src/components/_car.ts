import { gearSettings } from '../config';

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

        this.controls();
    },

    controls() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    },

    onKeyDown(e) {
        switch (e.code) {
            case 'ArrowUp':
                this.throttle = 1;
                break;
            case 'ArrowDown':
                this.throttle = -1;
                break;
            case 'Space':
                this.shiftGear(true);
                break;
            case 'ShiftLeft':
                this.shiftGear(false);
                break;
        }
    },

    onKeyUp(e) {
        if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
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
        this.t += this.speed * 0.0007;

        // Траектория в виде восьмерки
        // const x = Math.sin(this.t) * 1.3;
        // const z = Math.sin(this.t * 2) * 0.8;
        const a = 3.1; // Большая полуось
        const b = 1.7; // Малая полуось
        const x = a * Math.cos(this.t);
        const z = b * Math.sin(this.t);

        this.el.object3D.position.set(x, 1.07, z);

        // Плавный поворот
        // Расчет направления движения
        const dx = -a * Math.sin(this.t); // Производная по X
        const dz = b * Math.cos(this.t); // Производная по Z

        this.el.object3D.rotation.y = Math.atan2(dx, dz) + Math.PI / 45;
    },

    updateUi() {
        document.getElementById('speed').textContent = Math.floor(
            this.speed,
        ).toString();
        document.getElementById('gear').textContent = this.currentGear;
        document.getElementById('rpm').textContent = Math.floor(
            this.rpm,
        ).toString();
        document.querySelector('.rpm-fill').style.width = `${
            (this.rpm / 6500) * 100
        }%`;
    },
});
