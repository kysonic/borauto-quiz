import { supabase } from '../lib/db';
import { generateFingerprint } from '../lib/fingerprint';

AFRAME.registerComponent('score-manager', {
    init() {
        this.isSending = false;
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.bindVR() : this.bindDom();
    },

    bindDom() {
        this.nameInputDom = document.getElementById('name-input-dom');
        this.nameErrorDom = document.getElementById('name-error-dom');
        this.saveButtonDom = document.getElementById('save-score-button-dom');
        // Handlers
        this.changeNameDomHandler = this.changeNameDom.bind(this);
        this.saveScoresHandler = this.saveScores.bind(this);
        // Events
        this.nameInputDom.addEventListener('input', this.changeNameDomHandler);
        this.saveButtonDom.addEventListener('click', this.saveScoresHandler);
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

        this.nameErrorDom.textContent = '';
    },

    async saveScores(e) {
        e.preventDefault();

        if (this.hasError() || this.isSending) {
            return false;
        }

        const isInVR = this.el.sceneEl.is('vr-mode');
        this.isSending = true;
        isInVR ? this.saveVR() : this.saveDom();

        const fingerprint = await generateFingerprint();
        const { error } = await supabase.from('scores').upsert(
            {
                fingerprint,
                name: this.nameInputDom.value,
                score: this.el.sceneEl.systems['state'].state.laps,
            },
            {
                onConflict: 'fingerprint',
            },
        );
        this.isSending = false;
        isInVR ? this.savedVR() : this.savedDom();

        if (error) {
            return isInVR
                ? this.vrError('Не могу сохранить данные...')
                : this.domError('Не могу сохранить данные...');
        }

        this.el.sceneEl.emit('scores-saved');
    },

    saveDom() {
        this.saveButtonDom.textContent = 'сохраняем...';
    },

    saveVR() {},

    savedDom() {
        this.saveButtonDom.textContent = 'ОТПРАВИТЬ';
    },

    domError(error) {
        this.nameErrorDom.textContent = error;
    },

    vrError(error) {},

    hasError() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        return isInVR ? false : !!this.nameErrorDom.textContent;
    },
});
