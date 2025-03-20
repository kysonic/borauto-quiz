import { Font } from '../config';

AFRAME.registerTemplate(
    'input',
    ({ id, color, placeholder, position, rotation, scale }) => /*html*/ ` 
  <a-entity scale="${scale}" position="${position}" rotation="${rotation}">
      <a-rounded 
        id="${`a-input-holder-${id}`}"
        class="collidable"
        event-emit__common="__event: mouseup; __emit: a-input-click"
        event-set__mouseenter="material.opacity: 0.3"
        event-set__mouseleave="material.opacity: 0.2"
        opacity="0.2" color="#000" width="1.5" height="0.3" radius="0.1"></a-rounded>
      <a-text
          id="${`a-input-text-${id}`}"
          font="${Font}"
          color="${color}"
          value="${placeholder}"
          width="3"
          position="0.1 0.15 0"
      ></a-text>
      <a-entity
          id="${`a-input-keyboard-${id}`}"
          scale="2 2 2"
          position="0.3 -0.1 0"
          visible="false"
          a-keyboard
      />
  </a-entity>
`,
);

AFRAME.registerComponent('a-input', {
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
        position: {
            type: 'string',
            default: '0 0 0',
        },
        rotation: {
            type: 'string',
            default: '0 0 0',
        },
        scale: {
            type: 'string',
            default: '1 1 1',
        },
        max: {
            type: 'number',
            default: 200,
        },
    },

    init() {
        this.value = '';
        this.template = document.createElement('a-template');
        this.template.setAttribute('name', 'input');
        this.template.setAttribute(
            'options',
            `id: ${this.data.id};
             color: ${this.data.textColor};
             placeholder: ${this.data.placeholder};
             position: ${this.data.position};
             rotation: ${this.data.rotation};
             scale: ${this.data.scale}`,
        );
        this.el.appendChild(this.template);
        // Elements
        this.holder = this.el.sceneEl.querySelector(
            `#a-input-holder-${this.data.id}`,
        );
        this.text = this.el.sceneEl.querySelector(
            `#a-input-text-${this.data.id}`,
        );
        this.keyboard = this.el.sceneEl.querySelector(
            `#a-input-keyboard-${this.data.id}`,
        );
        // Handlers
        this.onHolderClickHandler = this.onHolderClick.bind(this);
        this.onKeyboardUpdateHandler = this.onKeyboardUpdate.bind(this);
        this.vrModeHandler = this.vrMode.bind(this);
        this.domModeHandler = this.domMode.bind(this);
        // Events
        this.holder.addEventListener(
            'a-input-click',
            this.onHolderClickHandler,
        );
        document.addEventListener(
            'a-keyboard-update',
            this.onKeyboardUpdateHandler,
        );
        // Fixme - this code could be deleted if a-frame-router-template will support parent visibility
        this.holder.setAttribute('visible', this.el.sceneEl.is('vr-mode'));
        this.text.setAttribute('visible', this.el.sceneEl.is('vr-mode'));
        this.el.sceneEl.addEventListener('enter-vr', this.vrModeHandler);
        this.el.sceneEl.addEventListener('exit-vr', this.domModeHandler);
    },

    remove() {
        this.holder.removeEventListener(
            'a-input-click',
            this.onKeyboardClickHandler,
        );
        document.removeEventListener(
            'a-keyboard-update',
            this.onKeyboardUpdateHandler,
        );
        this.el.sceneEl.removeEventListener('enter-vr', this.vrModeHandler);
        this.el.sceneEl.removeEventListener('exit-vr', this.domModeHandler);
        this.el.removeChild(this.template);
    },

    onHolderClick() {
        this.keyboard.setAttribute(
            'visible',
            !Boolean(this.keyboard.getAttribute('visible')),
        );
    },

    onKeyboardUpdate(e) {
        const code = parseInt(e.detail.code);
        switch (code) {
            case 8:
                this.value = this.value.slice(0, -1);
                break;
            case 0o6:
                this.onHolderClick();
                return;
            default:
                this.value = this.value + e.detail.value;
                break;
        }

        if (this.data.max && this.value.length > this.data.max) {
            this.value = this.value.substr(0, this.data.max);
        }

        this.text.setAttribute('value', this.value + '_');
        this.el.sceneEl.emit('change-input-text', { value: this.value });
    },

    vrMode() {
        this.holder.setAttribute('visible', true);
        this.text.setAttribute('visible', true);
    },

    domMode() {
        this.holder.setAttribute('visible', false);
        this.text.setAttribute('visible', false);
    },
});
