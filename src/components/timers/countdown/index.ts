import type { Entity } from 'aframe';
import { domUi } from '@/lib/dom-ui';
import { AssertType, ISoundComponent } from '@/types/common';
import { StateSystem } from '@/states/type';
import { ICountdownComponent } from './type';

AFRAME.registerComponent<ICountdownComponent>('countdown', {
    countdown: 4,
    i: null,
    countdownDOMNode: null,
    countdownVRNode: null,
    countdownNumberDOMNode: null,
    countdownNumberVRNode: null,
    countdownGoDOMNode: null,
    countdownGoVRNode: null,
    countdownSound: null,

    vrModeHandler: () => {},
    domModeHandler: () => {},
    updateTimerHandler: () => {},

    init() {
        this.countdown = 4;
        // Nodes
        this.nodes();
        // Handlers
        this.vrModeHandler = this.vrMode.bind(this);
        this.domModeHandler = this.domMode.bind(this);
        this.updateTimerHandler = this.updateTimer.bind(this);
        // Events
        this.el?.sceneEl?.addEventListener('enter-vr', this.vrModeHandler);
        this.el?.sceneEl?.addEventListener('exit-vr', this.domModeHandler);
        // Init
        this.i = setInterval(this.updateTimerHandler, 1000);
        this.sound();
        this.el?.sceneEl?.is('vr-mode')
            ? this.vrModeHandler()
            : this.domModeHandler();
    },

    nodes() {
        this.countdownDOMNode = document.getElementById('countdown-dom');
        this.countdownVRNode = document.getElementById('countdown-vr');
        this.countdownNumberDOMNode = document.getElementById(
            'countdown-number-dom',
        );
        this.countdownNumberVRNode = document.getElementById(
            'countdown-number-vr',
        );
        this.countdownGoDOMNode = document.getElementById('countdown-go-dom');
        this.countdownGoVRNode = document.getElementById('countdown-go-vr');
        this.countdownSound = AssertType<Entity<ISoundComponent>>(
            document.getElementById('countdown-sound-e'),
        );
    },

    remove() {
        this.el?.sceneEl?.removeEventListener('enter-vr', this.vrModeHandler);
        this.el?.sceneEl?.removeEventListener('exit-vr', this.domModeHandler);
        this.countdownSound?.components.sound.stopSound();
        if (this.i) {
            clearInterval(this.i);
        }
    },

    updateTimer() {
        this.countdown--;
        this.el?.sceneEl?.is('vr-mode') ? this.updateVr() : this.updateDom();

        if (this.countdown === 0 && this.i) {
            this.el?.sceneEl?.emit('countdown-finished');
            clearInterval(this.i);
            this.go();
        }
    },

    updateDom() {
        if (this.countdownNumberDOMNode) {
            this.countdownNumberDOMNode.textContent = this.countdown.toString();
        }
    },

    updateVr() {
        if (this.countdownNumberVRNode) {
            this.countdownNumberVRNode.setAttribute(
                'value',
                this.countdown.toString(),
            );
        }
    },

    vrMode() {
        if (this.countdown && this.countdownDOMNode) {
            this.el.setAttribute('visible', 'true');
            domUi.hideNode(this.countdownDOMNode);
        }
    },

    domMode() {
        if (this.countdown && this.countdownDOMNode) {
            this.el.setAttribute('visible', 'false');
            domUi.showNode(this.countdownDOMNode);
        }
    },

    go() {
        const isInVR = this.el?.sceneEl?.is('vr-mode');
        isInVR ? this.VRGo() : this.DOMGo();

        setTimeout(() => {
            this.hide();
        }, 1000);
    },

    VRGo() {
        this.countdownNumberVRNode?.setAttribute('color', '#ccc');
        document
            .getElementById('countdown-go-circle-vr')
            ?.setAttribute('color', 'green');
        this.countdownGoVRNode?.setAttribute('value', 'GO!');
    },

    DOMGo() {
        this.countdownNumberDOMNode?.classList.remove('active');
        this.countdownGoDOMNode?.classList.add('active');
        if (this.countdownGoDOMNode) {
            this.countdownGoDOMNode.textContent = 'GO!';
        }
    },

    VRClear() {
        this.countdownNumberVRNode?.setAttribute('color', 'red');
        document
            .getElementById('countdown-go-circle-vr')
            ?.setAttribute('color', '#ccc');
        this.countdownGoVRNode?.setAttribute('value', '');
    },

    DOMClear() {
        this.countdownNumberDOMNode?.classList.add('active');
        this.countdownGoDOMNode?.classList.remove('active');
        if (this.countdownGoDOMNode) {
            this.countdownGoDOMNode.textContent = '';
        }
    },

    hide() {
        const isInVR = this.el?.sceneEl?.is('vr-mode');
        isInVR ? this.VRClear() : this.DOMClear();
        this.el.setAttribute('visible', 'false');
        if (this.countdownDOMNode) {
            domUi.hideNode(this.countdownDOMNode);
        }
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
