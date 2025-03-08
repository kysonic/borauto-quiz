import { domUi } from '../lib/dom-ui';

AFRAME.registerComponent('countdown', {
    init() {
        this.countdown = 4;
        const isInVR = this.el.sceneEl.is('vr-mode');
        // Nodes
        this.nodes();
        // Setup ui
        isInVR ? this.vrMode() : this.domMode();
        // Handlers
        this.vrModeHandler = this.vrMode.bind(this);
        this.domModeHandler = this.domMode.bind(this);
        this.updateHandler = this.update.bind(this);
        // Events
        this.el.sceneEl.addEventListener('enter-vr', this.vrModeHandler);
        this.el.sceneEl.addEventListener('exit-vr', this.domModeHandler);
        this.i = setInterval(this.updateHandler, 1000);
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
    },

    remove() {
        this.el.sceneEl.removeEventListener('enter-vr', this.vrModeHandler);
        this.el.sceneEl.removeEventListener('exit-vr', this.domModeHandler);
        clearInterval(this.i);
    },

    update() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        this.countdown--;
        isInVR ? this.updateVr() : this.updateDom();

        if (this.countdown === 0) {
            this.el.sceneEl.emit('countdown-finished');
            clearInterval(this.i);
            this.go();
        }
    },

    updateDom() {
        this.countdownNumberDOMNode.textContent = this.countdown;
    },

    updateVr() {
        this.countdownNumberVRNode.setAttribute('value', this.countdown);
    },

    vrMode() {
        if (this.countdown) {
            this.el.setAttribute('visible', 'true');
            domUi.hideNode(this.countdownDOMNode);
        }
    },

    domMode() {
        if (this.countdown) {
            this.el.setAttribute('visible', 'false');
            domUi.showNode(this.countdownDOMNode);
        }
    },

    go() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.VRGo() : this.DOMGo();

        setTimeout(() => {
            this.hide();
        }, 1000);
    },

    VRGo() {
        this.countdownNumberVRNode.setAttribute('color', '#ccc');
        document
            .getElementById('countdown-go-circle-vr')
            .setAttribute('color', 'green');
        this.countdownGoVRNode.setAttribute('value', 'GO!');
    },

    DOMGo() {
        this.countdownNumberDOMNode.classList.remove('active');
        this.countdownGoDOMNode.classList.add('active');
        this.countdownGoDOMNode.textContent = 'GO!';
    },

    VRClear() {
        this.countdownNumberVRNode.setAttribute('color', 'red');
        document
            .getElementById('countdown-go-circle-vr')
            .setAttribute('color', '#ccc');
        this.countdownGoVRNode.setAttribute('value', '');
    },

    DOMClear() {
        this.countdownNumberDOMNode.classList.add('active');
        this.countdownGoDOMNode.classList.remove('active');
        this.countdownGoDOMNode.textContent = '';
    },

    hide() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.VRClear() : this.DOMClear();
        this.el.setAttribute('visible', 'false');
        domUi.hideNode(this.countdownDOMNode);
    },
});
