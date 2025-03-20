import { supabase } from '../lib/db';
import { generateFingerprint } from '../lib/fingerprint';

AFRAME.registerComponent('score-manager', {
    init() {
        this.isSending = false;
        this.el.sceneEl.is('vr-mode') ? this.bindVr() : this.bindDom();
    },

    bindDom() {
        this.nameInputDom = document.getElementById('name-input-dom');
        this.nameErrorDom = document.getElementById('name-error-dom');
        this.saveButtonDom = document.getElementById('save-score-button-dom');
        // Handlers
        this.changeNameDomHandler = this.changeNameDom.bind(this);
        this.submitScoreDomHandler = this.submitScoreDom.bind(this);
        // Events
        this.nameInputDom.addEventListener('input', this.changeNameDomHandler);
        this.saveButtonDom.addEventListener(
            'click',
            this.submitScoreDomHandler,
        );
    },

    bindVr() {
        this.nameErrorVr = document.getElementById('error-text-vr');
        this.nameInputVr = document.getElementById('enter-name-input-vr');
        this.sendScoreButtonVr = document.getElementById(
            'send-score-button-vr',
        );
        // Handlers
        this.submitScoreVrHandler = this.submitScoreVr.bind(this);
        this.changeNameVrHandler = this.changeNameVr.bind(this);
        // Events
        this.el.sceneEl.addEventListener(
            'submit-score',
            this.submitScoreVrHandler,
        );
        this.el.sceneEl.addEventListener(
            'change-input-text',
            this.changeNameVrHandler,
        );
    },

    remove() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.unbindVR() : this.unbindDom();
    },

    unbindDom() {
        this.nameInputDom.removeEventListener(
            'input',
            this.changeNameDomHandler,
        );
        this.saveButtonDom.removeEventListener('click', this.saveScoresHandler);
    },

    changeNameDom(e) {
        if (!e.target.value) {
            return this.domError('Имя не может быть пустым...');
        }
        if (e.target.value.length > 30) {
            return this.domError('Имя не может быть больше 30 символов...');
        }

        this.domError('');
    },

    changeNameVr(e) {
        if (!e.detail.value) {
            return this.vrError('Имя не может быть пустым...');
        }
        if (e.detail.value.length > 30) {
            return this.vrError('Имя не может быть больше 30 символов...');
        }

        this.vrError('');
    },

    async submitScoreDom(e) {
        e.preventDefault();

        if (this.hasError() || this.isSending) {
            return false;
        }

        this.isSending = true;
        this.saveDom();

        const error = await this.saveToDatabase(this.nameInputDom.value);

        this.isSending = false;
        this.savedDom();

        if (error) {
            return this.domError('Не могу сохранить данные...');
        }

        this.el.sceneEl.emit('scores-saved');
    },

    async submitScoreVr() {
        if (this.hasError() || this.isSending) {
            return false;
        }

        this.isSending = true;
        this.saveVr();

        const error = await this.saveToDatabase(
            this.nameInputVr.components['a-input'].value,
        );

        this.isSending = false;
        this.savedVr();

        if (error) {
            return this.domError('Не могу сохранить данные...');
        }

        this.el.sceneEl.emit('scores-saved');
    },

    async saveToDatabase(name) {
        const fingerprint = await generateFingerprint();
        const { error } = await supabase.from('scores').upsert(
            {
                fingerprint,
                name: name,
                score: this.el.sceneEl.systems['state'].state.laps,
            },
            {
                onConflict: 'fingerprint',
            },
        );

        return error;
    },

    saveDom() {
        this.saveButtonDom.textContent = 'сохраняем...';
    },

    saveVr() {
        this.sendScoreButtonVr.setAttribute('value', 'сохраняем...');
    },

    savedDom() {
        this.saveButtonDom.textContent = 'ОТПРАВИТЬ';
    },

    savedVr() {
        this.sendScoreButtonVr.setAttribute('value', 'ОТПРАВИТЬ');
    },

    domError(error) {
        this.nameErrorDom.textContent = error;
    },

    vrError(error) {
        this.nameErrorVr.setAttribute('value', error);
    },

    hasError() {
        const isInVR = this.el.sceneEl.is('vr-mode');

        return isInVR
            ? !!this.nameErrorVr.getAttribute('value')
            : !!this.nameErrorDom.textContent;
    },
});
