import type { Entity } from 'aframe';
import { config } from '@/config';
import { createHTMLFromString } from '@/lib/dom';
import { AInputComponent, IKeyboardEvent } from './type';

export interface IChangeInputText {
    value: string;
}

AFRAME.registerComponent<AInputComponent>('a-input', {
    el: {} as Entity,

    schema: {
        id: {
            type: 'string',
            default: 'enter-text',
        },
        textColor: {
            type: 'string',
            default: '#fff',
        },
        placeholder: {
            type: 'string',
            default: 'Enter text...',
        },
        max: {
            type: 'number',
            default: 200,
        },
    },

    value: '',
    holder: null,
    text: null,
    keyboard: null,
    data: {},
    onHolderClickHandler: () => {},
    onKeyboardUpdateHandler: (e: Event) => {},

    init() {
        this.value = '';
        // Elements
        this.createElements();
        // Handlers
        this.onHolderClickHandler = this.onHolderClick.bind(this);
        this.onKeyboardUpdateHandler = this.onKeyboardUpdate.bind(this);
        // Events
        this.holder?.addEventListener(
            'a-input-click',
            this.onHolderClickHandler,
        );
        document.addEventListener(
            'a-keyboard-update',
            this.onKeyboardUpdateHandler,
        );
    },

    remove() {
        this.holder?.removeEventListener(
            'a-input-click',
            this.onHolderClickHandler,
        );
        document.removeEventListener(
            'a-keyboard-update',
            this.onKeyboardUpdateHandler,
        );
    },

    createElements() {
        this.createHolder();
        this.createText();
        this.createKeyboard();
    },

    createHolder() {
        this.holder = createHTMLFromString<Entity>(/*html*/ `
            <a-rounded 
                id="${`a-input-holder-${this.data.id}`}"
                class="collidable"
                event-emit__common="__event: mouseup; __emit: a-input-click"
                event-set__mouseenter="material.opacity: 0.3"
                event-set__mouseleave="material.opacity: 0.2"
                opacity="0.2" color="#000" width="1.5" height="0.3" radius="0.1"></a-rounded>
            `);

        this.el.appendChild(this.holder);
    },

    createText() {
        this.text = createHTMLFromString<Entity>(/*html*/ `
            <a-text
                id="${`a-input-text-${this.data.id}`}"
                font="${config.common.ui.Font}"
                color="${this.data.textColor}"
                value="${this.data.placeholder}"
                width="3"
                position="0.1 0.15 0"
            ></a-text>
        `);

        this.el.appendChild(this.text);
    },

    createKeyboard() {
        this.keyboard = createHTMLFromString<Entity>(/*html*/ `
            <a-entity
                id="${`a-input-keyboard-${this.data.id}`}"
                scale="2 2 2"
                position="0.3 -0.1 0"
                visible="false"
                a-keyboard
            />
        `);

        this.el.appendChild(this.keyboard);
    },

    onHolderClick() {
        this.keyboard?.setAttribute(
            'visible',
            !Boolean(this.keyboard.getAttribute('visible')),
        );
    },

    onKeyboardUpdate(e: Event) {
        const customEvent = e as CustomEvent<IKeyboardEvent>;
        const code = parseInt(customEvent.detail.code);

        switch (code) {
            case 8:
                this.value = this.value.slice(0, -1);
                break;
            case 0o6:
                this.onHolderClick();
                return;
            default:
                this.value = this.value + customEvent.detail.value;
                break;
        }

        if (this.data.max && this.value.length > this.data.max) {
            this.value = this.value.substr(0, this.data.max);
        }

        this.text?.setAttribute('value', this.value + '_');
        this.el?.sceneEl?.emit('change-input-text', { value: this.value });
    },
});
