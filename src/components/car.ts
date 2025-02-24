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
                this.throttle = -0.7;
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
        if (this.isShifting) {
            return false;
        }

        const newGear = this.currentGear + (up ? 1 : -1);

        if (newGear < 1 || newGear > 5) {
            return false;
        }

        this.isShifting = true;
        this.currentGear = newGear;

        // Эффект переключения передачи
        setTimeout(() => {
            this.isShifting = false;
            this.rpm = Math.max(800, this.rpm - 500);
        }, 300);
    },

    tick() {
        this.updatePhysics();
        this.updatePosition();
        this.updateUi();
    },

    updatePhysics() {
        const gear = gearSettings[this.currentGear];
        const speedRatio = this.speed / gear.maxSpeed;

        if (this.throttle === 0) {
            this.speed *= 0.993;
            this.rpm *= 0.97;
        } else {
            // Расчет ускорения
            let acceleration = gear.acceleration * (1 - speedRatio);
            acceleration *= this.throttle * (this.rpm > 5000 ? 0.8 : 1);
            this.speed += acceleration;

            // Ограничение скорости
            this.speed = Math.min(this.speed, gear.maxSpeed);
        }

        // Расчет оборотов
        this.rpm = 800 + this.speed * gear.rpmMultiplier;
        this.rpm = Math.min(this.rpm, gear.maxRpm);

        // Ограничение при красной зоне
        if (this.rpm >= gear.maxRpm - 200) {
            this.speed *= 0.995;
            this.rpm = gear.maxRpm - 200;
        }
    },

    updatePosition() {
        this.t += this.speed * 0.0007;

        // Траектория в виде восьмерки
        const x = Math.sin(this.t) * 1;
        const z = Math.sin(this.t * 2) * 0.5;

        this.el.object3D.position.set(x, 1.03, z - 4);

        // Плавный поворот
        const dx = Math.cos(this.t) * 1;
        const dz = Math.cos(this.t * 2) * 1;

        this.el.object3D.rotation.y = Math.atan2(dx, dz) + Math.PI / 2;
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
