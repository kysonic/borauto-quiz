import type { Entity } from 'aframe';
import { supabase } from '@/lib/db';
import { generateFingerprint } from '@/lib/fingerprint';
import { AssertType } from '@/types/common';
import { IChangeInputText } from '@/components/a-components/a-input';
import { AInputComponent } from '@/components/a-components/a-input/type';
import { StateSystem } from '@/states/type';
import { ScoreManagerComponent } from './type';

AFRAME.registerComponent<ScoreManagerComponent>('score-manager', {
    isSending: false,
    nameInputDom: null,
    nameErrorDom: null,
    saveButtonDom: null,
    nameErrorVr: null,
    nameInputVr: null,
    sendScoreButtonVr: null,

    changeNameDomHandler: () => {},
    submitScoreDomHandler: () => {},
    submitScoreVrHandler: () => {},
    changeNameVrHandler: () => {},
    saveScoresHandler: () => {},

    init() {
        this.isSending = false;
        this.el?.sceneEl?.is('vr-mode') ? this.bindVr() : this.bindDom();
    },

    bindDom() {
        this.nameInputDom = document.getElementById(
            'name-input-dom',
        ) as HTMLInputElement;
        this.nameErrorDom = document.getElementById('name-error-dom');
        this.saveButtonDom = document.getElementById('save-score-button-dom');
        // Handlers
        this.changeNameDomHandler = this.changeNameDom.bind(this);
        this.submitScoreDomHandler = this.submitScoreDom.bind(this);
        // Events
        this.nameInputDom?.addEventListener('input', this.changeNameDomHandler);
        this.saveButtonDom?.addEventListener(
            'click',
            this.submitScoreDomHandler,
        );
    },

    bindVr() {
        this.nameErrorVr = AssertType<Entity>(
            document.getElementById('error-text-vr'),
        );
        this.nameInputVr = AssertType<
            Entity<{
                input: AInputComponent;
            }>
        >(document.getElementById('enter-name-input-vr'));

        this.sendScoreButtonVr = AssertType<Entity>(
            document.getElementById('send-score-button-vr'),
        );
        // Handlers
        this.submitScoreVrHandler = this.submitScoreVr.bind(this);
        this.changeNameVrHandler = this.changeNameVr.bind(this);
        // Events
        this.el?.sceneEl?.addEventListener(
            'submit-score',
            this.submitScoreVrHandler,
        );
        this.el?.sceneEl?.addEventListener(
            'change-input-text',
            this.changeNameVrHandler,
        );
    },

    remove() {
        this.el?.sceneEl?.is('vr-mode') ? this.unbindVR() : this.unbindDom();
    },

    unbindDom() {
        this.nameInputDom?.removeEventListener(
            'input',
            this.changeNameDomHandler,
        );
        this.saveButtonDom?.removeEventListener(
            'click',
            this.saveScoresHandler,
        );
    },

    unbindVR() {
        this.nameInputDom?.removeEventListener(
            'input',
            this.changeNameDomHandler,
        );
        this.saveButtonDom?.removeEventListener(
            'click',
            this.saveScoresHandler,
        );
    },

    changeNameDom(e) {
        if (e.target instanceof HTMLInputElement) {
            if (!e.target?.value) {
                return this.domError('Имя не может быть пустым...');
            }
            if (e.target.value.length > 30) {
                return this.domError('Имя не может быть больше 30 символов...');
            }
        }

        this.domError('');
    },

    changeNameVr(e) {
        const customEvent = e as CustomEvent<IChangeInputText>;

        if (!customEvent.detail.value) {
            return this.vrError('Имя не может быть пустым...');
        }
        if (customEvent.detail.value.length > 30) {
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

        const error = await this.saveToDatabase(this.nameInputDom?.value ?? '');

        this.isSending = false;
        this.savedDom();

        if (error) {
            return this.domError('Не могу сохранить данные...');
        }

        this.el?.sceneEl?.emit('scores-saved');
    },

    async submitScoreVr() {
        if (this.hasError() || this.isSending) {
            return false;
        }

        this.isSending = true;
        this.saveVr();

        const error = await this.saveToDatabase(
            this.nameInputVr?.components.input.value ?? '',
        );

        this.isSending = false;
        this.savedVr();

        if (error) {
            return this.domError('Не могу сохранить данные...');
        }

        this.el?.sceneEl?.emit('scores-saved');
    },

    async saveToDatabase(name) {
        const fingerprint = await generateFingerprint();
        const { error } = await supabase.from('scores').upsert(
            {
                fingerprint,
                name: name,
                score: AssertType<StateSystem>(this.el?.sceneEl?.systems.state)
                    .state.laps,
            },
            {
                onConflict: 'fingerprint',
            },
        );

        return error;
    },

    saveDom() {
        if (this.saveButtonDom) {
            this.saveButtonDom.textContent = 'сохраняем...';
        }
    },

    saveVr() {
        if (this.sendScoreButtonVr) {
            this.sendScoreButtonVr.setAttribute('value', 'сохраняем...');
        }
    },

    savedDom() {
        if (this.saveButtonDom) {
            this.saveButtonDom.textContent = 'ОТПРАВИТЬ';
        }
    },

    savedVr() {
        if (this.sendScoreButtonVr) {
            this.sendScoreButtonVr.setAttribute('value', 'ОТПРАВИТЬ');
        }
    },

    domError(error) {
        if (this.nameErrorDom) {
            this.nameErrorDom.textContent = error;
        }
    },

    vrError(error) {
        if (this.nameErrorVr) {
            this.nameErrorVr.setAttribute('value', error);
        }
    },

    hasError() {
        return this.el?.sceneEl?.is('vr-mode')
            ? !!this.nameErrorVr?.getAttribute('value')
            : !!this.nameErrorDom?.textContent;
    },
});
