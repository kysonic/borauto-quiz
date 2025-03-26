import { Entity } from 'aframe';
import { config } from '@/config';
import { createHTMLFromString } from '@/lib/dom';
import { AssertType, ISoundComponent } from '@/types/common';
import { IStateUpdateEvent, StateSystem } from '@/states/type';
import { GameRunnerComponent } from './type';
import { wrapWithSoundEnabler } from '@/lib/common';

AFRAME.registerComponent<GameRunnerComponent>('game-runner', {
    car: null,
    confetti: null,
    confettiSound: null,
    nosList: null,

    endCycleHandler: () => {},
    stateUpdateHandler: () => {},

    init() {
        this.car = AssertType<Entity>(document.getElementById('car'));
        this.confetti = AssertType<Entity>(document.getElementById('confetti'));
        this.confettiSound = AssertType<Entity>(
            document.getElementById('confetti-sound-e'),
        );
        this.nosList = AssertType<Entity>(document.getElementById('nos-list'));
        // Handlers
        this.endCycleHandler = this.endCycle.bind(this);
        this.stateUpdateHandler = this.stateUpdate.bind(this);
        //Events
        this.el?.sceneEl?.addEventListener('timer-done', this.endCycleHandler);
        this.el?.sceneEl?.addEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
        // Init
        this.renderNitro();
    },

    remove() {
        this.el?.sceneEl?.removeEventListener(
            'timer-done',
            this.endCycleHandler,
        );
        this.el?.sceneEl?.removeEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
    },

    endCycle() {
        if (!this.car) {
            return false;
        }

        const carPosition = this.car.object3D.position;
        this.car.parentNode?.removeChild(this.car);
        this.playSound();

        this.confetti?.setAttribute(
            'confetti-effect',
            `position: ${carPosition.x} ${carPosition.y} ${carPosition.z}; particleCount: 200; size: 0.01; border: 0.2; gravity: 0.0005; bounce: 0.1`,
        );

        setTimeout(() => {
            this.el?.sceneEl?.emit('timer-finished');
        }, 2000);
    },

    stateUpdate(e: Event) {
        const customEvent = e as CustomEvent<IStateUpdateEvent>;
        const action = customEvent.detail.action;
        // Because a-frame-state cannot handle arrays
        if (['setNitro', 'useNitro', 'increaseNitro'].includes(action)) {
            this.renderNitro();
        }
    },

    renderNitro() {
        if (!this.nosList) {
            return false;
        }
        // Clear container
        this.nosList.innerHTML = '';
        // Get state
        const nitro = AssertType<StateSystem>(
            this.el?.sceneEl?.systems['state'],
        ).state.nitro;
        // Render list
        for (let i = 0; i <= config.car.maxNitro; i++) {
            const x = i * 0.03 - 0.119;
            const img = i < nitro ? '#nos-active' : '#nos';

            this.nosList?.appendChild(
                createHTMLFromString<Entity>(/*html*/ `
                            <a-entity>
                                <a-image position="${x} 0.05 0.02" width="0.03" height="0.03" rotation="0 0 0" src="${img}" />
                            </a-entity>
                        `),
            );
        }
    },

    playSound: wrapWithSoundEnabler(function (this: GameRunnerComponent) {
        AssertType<ISoundComponent>(
            this.confettiSound?.components,
        ).sound.playSound();
    }),
});
