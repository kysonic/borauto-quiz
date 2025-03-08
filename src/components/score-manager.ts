import { domUi } from '../lib/dom-ui';

AFRAME.registerComponent('score-manager', {
    init() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.bindVR() : this.bindDom();
    },

    bindDom() {
        this.nameInputDom = document.getElementById('name-input-dom');
        this.nameErrorDom = document.getElementById('name-error-dom');
        this.changeNameDomHandler = this.changeNameDom.bind(this);
        this.nameInputDom.addEventListener('input', this.changeNameDomHandler);
    },

    remove() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.unbindVR() : this.unbindDom();
    },

    unbindDom() {
        console.log('unbindDom');
        this.nameInputDom.removeEventListener(
            'change',
            this.changeNameDomHandler,
        );
    },

    changeNameDom(e) {
        if (!e.target.value) {
            return (this.nameErrorDom.textContent =
                'Имя не может быть пустым...');
        }
        if (e.target.value.length > 30) {
            return (this.nameErrorDom.textContent =
                'Имя не может быть больше 30 символов...');
        }

        this.nameErrorDom.textContent = '';
    },
});
