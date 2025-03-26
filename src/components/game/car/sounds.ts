import { Entity } from 'aframe';
import { StateSystem } from '@/states/type';
import { AssertType, ISoundComponent } from '@/types/common';
import { ICarExtended, ICarSoundsMixin } from './types';
import { wrapWithSoundEnabler } from '@/lib/common';

export const SoundsMixin: ICarSoundsMixin = {
    el: {} as Entity,
    gasSoundStarted: false,

    initSounds() {
        // Vars
        this.gasSoundStarted = false;
        // Nodes
        this.idleSound = document.getElementById(
            'idle-sound-e',
        ) as Entity<ISoundComponent>;
        this.startSound = document.getElementById(
            'start-sound-e',
        ) as Entity<ISoundComponent>;
        this.gearboxSound = document.getElementById(
            'gearbox-sound-e',
        ) as Entity<ISoundComponent>;
        this.gasStartSound = document.getElementById(
            'gas-start-e',
        ) as Entity<ISoundComponent>;
        this.gasTopSound = document.getElementById(
            'gas-top-e',
        ) as Entity<ISoundComponent>;
        this.gasGearSound = document.getElementById(
            'gas-gear-e',
        ) as Entity<ISoundComponent>;
        this.nitroSound = document.getElementById(
            'nitro-sound-e',
        ) as Entity<ISoundComponent>;
    },

    removeSounds() {
        this.idleSound?.components.sound.stopSound();
        this.startSound?.components.sound.stopSound();
        this.gearboxSound?.components.sound.stopSound();
        this.gasStartSound?.components.sound.stopSound();
        this.gasTopSound?.components.sound.stopSound();
        this.gasGearSound?.components.sound.stopSound();
        this.nitroSound?.components.sound.stopSound();
    },

    startSounds: wrapWithSoundEnabler(function (this: ICarExtended) {
        setTimeout(() => {
            this.startSound?.components.sound.playSound();

            setTimeout(() => {
                this.idleSound?.components.sound.playSound();
            }, 1000);
        }, 500);
    }),

    startGasSound: wrapWithSoundEnabler(function (this: ICarExtended) {
        if (!this.gasSoundStarted) {
            this.gasSoundStarted = true;
            this.gasStartSound?.components.sound.playSound();

            setTimeout(() => {
                this.gasTopSound?.components.sound.playSound();
            }, 500);
        }
    }),

    startNitroSound: wrapWithSoundEnabler(function (this: ICarExtended) {
        this.nitroSound?.components.sound.playSound();
    }),

    gearSound: wrapWithSoundEnabler(function (this: ICarExtended) {
        this.gearboxSound?.components.sound.playSound();
        this.gasTopSound?.components.sound.stopSound();

        setTimeout(() => {
            this.gasSoundStarted = false;
            this.gasGearSound?.components.sound.playSound();
            this.startGasSound();
        }, 100);
    }),

    stopGasSound() {
        this.gasSoundStarted = false;
        this.gasTopSound?.components.sound.stopSound();
    },
};
