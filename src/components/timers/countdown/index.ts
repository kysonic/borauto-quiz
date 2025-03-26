import type { Entity } from 'aframe';
import { AssertType, ISoundComponent } from '@/types/common';
import { StateSystem } from '@/states/type';
import { ICountdownComponent } from './type';

AFRAME.registerComponent<ICountdownComponent>('countdown', {
    i: null,
    countdownSound: null,

    updateTimerHandler: () => {},

    init() {
        // Nodes
        this.countdownSound = AssertType<Entity<ISoundComponent>>(
            document.getElementById('countdown-sound-e'),
        );
        // Handlers
        this.updateTimerHandler = this.updateTimer.bind(this);
        // Init
        this.i = setInterval(this.updateTimerHandler, 1000);
        this.sound();

        this.el?.sceneEl?.emit('setCountdown', {
            countdown: 3,
        });
        this.el?.sceneEl?.emit('setShowCountdown', { show: true });
    },

    remove() {
        this.countdownSound?.components.sound.stopSound();
        if (this.i) {
            clearInterval(this.i);
        }
    },

    updateTimer() {
        const state = AssertType<StateSystem>(this.el?.sceneEl?.systems.state);

        this.el?.sceneEl?.emit('setCountdown', {
            countdown: --state.state.countdown,
        });

        if (state.state.countdown === 0 && this.i) {
            this.el?.sceneEl?.emit('countdown-finished');
            clearInterval(this.i);
            this.go();
        }
    },

    go() {
        setTimeout(() => {
            this.hide();
        }, 1000);
    },

    hide() {
        this.el?.sceneEl?.emit('setShowCountdown', { show: false });
    },

    sound() {
        const enabled = AssertType<StateSystem>(this.el?.sceneEl?.systems.state)
            .state.soundEnabled;
        if (!enabled) {
            return false;
        }
        this.countdownSound?.components.sound.playSound();
    },
});
