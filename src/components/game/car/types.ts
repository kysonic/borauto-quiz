import type { Entity, Component } from 'aframe';
import { AvailableGears, GearType } from '@/config';
import { ISoundComponent } from '@/types/common';

export interface ICarComponent {
    // Vars
    enabled: boolean;
    nitro: boolean;
    t: number;
    isLapping: boolean;
    throttle: number;
    speed: number;
    currentGear: AvailableGears;
    rpm: number;
    isShifting: boolean;
    progress: number;
    // Handlers
    enableCarHandler: (this: ICarExtended) => void;
    clearHandler: (this: ICarExtended) => void;
    sendEventsThrottled: (this: ICarExtended) => void;
    // Methods
    accelerate(this: ICarExtended): void;
    enableCar(this: ICarExtended): void;
    clear(this: ICarExtended): void;
    sendEvents(this: ICarExtended): void;
    break(this: ICarExtended): void;
    leave(this: ICarExtended): void;
    sendGear(this: ICarExtended): void;
    useNitro(this: ICarExtended): void;
    updatePhysics(this: ICarExtended, deltaTime: number): void;
    updatePosition(this: ICarExtended, deltaTime: number): void;
    shiftGear(this: ICarExtended, up: boolean): void;
    getAccelerationFactor(
        this: ICarExtended,
        gear: GearType,
        speedRatio: number,
    ): number;
}

export interface ICarControlsMixin {
    el: Entity;
    // Vars
    rightController?: HTMLElement | null;
    // Handlers
    triggerDownHandler: (this: ICarExtended) => void;
    triggerUpHandler: (this: ICarExtended) => void;
    gripDownHandler: (this: ICarExtended) => void;
    gripUpHandler: (this: ICarExtended) => void;
    thumbStickMovedHandler: (e: Event) => void;
    aButtonDownHandler: (this: ICarExtended) => void;
    aButtonUpHandler: (this: ICarExtended) => void;
    keydownHandler: (e: KeyboardEvent) => void;
    keyupHandler: (e: KeyboardEvent) => void;
    // Methods
    setupVrControls(this: ICarExtended): void;
    setupDomControls(this: ICarExtended): void;
    clearVrControls(this: ICarExtended): void;
    clearDomControls(this: ICarExtended): void;
    triggerDown(this: ICarExtended): void;
    triggerUp(this: ICarExtended): void;
    gripDown(this: ICarExtended): void;
    gripUp(this: ICarExtended): void;
    thumbStickMoved(this: ICarExtended, e: Event): void;
    aButtonDown(this: ICarExtended): void;
    aButtonUp(this: ICarExtended): void;
    onKeyDown(this: ICarExtended, e: KeyboardEvent): void;
    onKeyUp(this: ICarExtended, e: KeyboardEvent): void;
}

export interface ICarSoundsMixin {
    el: Entity;
    gasSoundStarted: boolean;
    idleSound?: Entity<ISoundComponent> | null;
    startSound?: Entity<ISoundComponent> | null;
    gearboxSound?: Entity<ISoundComponent> | null;
    gasStartSound?: Entity<ISoundComponent> | null;
    gasTopSound?: Entity<ISoundComponent> | null;
    gasGearSound?: Entity<ISoundComponent> | null;
    nitroSound?: Entity<ISoundComponent> | null;
    // Methods
    initSounds(this: ICarExtended): void;
    startSounds(this: ICarExtended): void;
    removeSounds(this: ICarExtended): void;
    startGasSound(this: ICarExtended): void;
    startNitroSound(this: ICarExtended): void;
    stopGasSound(this: ICarExtended): void;
    gearSound(this: ICarExtended): void;
}

export interface ICarExtended
    extends ICarComponent,
        ICarControlsMixin,
        ICarSoundsMixin {}
