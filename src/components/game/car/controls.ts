import type { Entity } from 'aframe';
import { config } from '@/config';
import { ICarControlsMixin } from './types';

export const ControlsMixin: ICarControlsMixin = {
    el: {} as Entity,

    triggerDownHandler: () => {},
    triggerUpHandler: () => {},
    gripDownHandler: () => {},
    gripUpHandler: () => {},
    thumbStickMovedHandler: () => {},
    aButtonDownHandler: () => {},
    aButtonUpHandler: () => {},
    keydownHandler: () => {},
    keyupHandler: () => {},

    setupVrControls() {
        this.rightController =
            this.el?.sceneEl?.querySelector('#right-controller');
        // Handlers
        this.triggerDownHandler = this.triggerDown.bind(this);
        this.triggerUpHandler = this.triggerUp.bind(this);
        this.gripDownHandler = this.gripDown.bind(this);
        this.gripUpHandler = this.gripUp.bind(this);
        this.thumbStickMovedHandler = this.thumbStickMoved.bind(this);
        this.aButtonDownHandler = this.aButtonDown.bind(this);
        this.aButtonUpHandler = this.aButtonUp.bind(this);
        // Events
        this.rightController?.addEventListener(
            'triggerdown',
            this.triggerDownHandler,
        );
        this.rightController?.addEventListener(
            'triggerup',
            this.triggerUpHandler,
        );
        this.rightController?.addEventListener(
            'gripdown',
            this.gripDownHandler,
        );
        this.rightController?.addEventListener('gripup', this.gripUpHandler);
        this.rightController?.addEventListener(
            'thumbstickmoved',
            this.thumbStickMovedHandler,
        );
        this.rightController?.addEventListener(
            'abuttondown',
            this.aButtonDownHandler,
        );
        this.rightController?.addEventListener(
            'abuttonup',
            this.aButtonUpHandler,
        );
    },

    setupDomControls() {
        // Handlers
        this.keydownHandler = this.onKeyDown.bind(this);
        this.keyupHandler = this.onKeyUp.bind(this);
        // Events
        window.addEventListener('keydown', this.keydownHandler);
        window.addEventListener('keyup', this.keyupHandler);
    },

    clearVrControls() {
        this.rightController?.removeEventListener(
            'triggerdown',
            this.triggerDownHandler,
        );
        this.rightController?.removeEventListener(
            'triggerup',
            this.triggerUpHandler,
        );
        this.rightController?.removeEventListener(
            'gripdown',
            this.gripDownHandler,
        );
        this.rightController?.removeEventListener('gripup', this.gripUpHandler);
        this.rightController?.removeEventListener(
            'thumbstickmoved',
            this.thumbStickMovedHandler,
        );
        this.rightController?.removeEventListener(
            'abuttondown',
            this.aButtonDownHandler,
        );
        this.rightController?.removeEventListener(
            'abuttonup',
            this.aButtonUpHandler,
        );
    },

    clearDomControls() {
        window.removeEventListener('keydown', this.keydownHandler);
        window.removeEventListener('keyup', this.keyupHandler);
    },

    triggerDown() {
        if (!this.enabled) {
            return false;
        }
        this.accelerate();
    },

    triggerUp() {
        this.leave();
    },

    gripDown() {
        this.break();
    },

    gripUp() {
        this.leave();
    },

    thumbStickMoved(e: CustomEvent) {
        const { y } = e.detail;

        if (y > 0.5) {
            this.shiftGear(false);
        } else if (y < -0.5) {
            this.shiftGear(true);
        }
    },

    aButtonDown() {
        this.useNitro();
    },

    aButtonUp() {
        // this.useNitro();
    },

    onKeyDown(e: KeyboardEvent) {
        switch (e.code) {
            case config.car.controls.desktop.accelerate:
                this.accelerate();
                break;
            case config.car.controls.desktop.break:
                this.break();
                break;
            case config.car.controls.desktop.gearUp:
                this.shiftGear(true);
                break;
            case config.car.controls.desktop.gearDown:
                this.shiftGear(false);
                break;
            case config.car.controls.desktop.nitro:
                this.useNitro();
                break;
        }
    },

    onKeyUp(e: KeyboardEvent) {
        if (
            e.code === config.car.controls.desktop.accelerate ||
            e.code === config.car.controls.desktop.break
        ) {
            this.leave();
        }
    },
};
