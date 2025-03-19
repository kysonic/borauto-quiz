import { Font } from '../config';

// var input = '';
// function updateInput(e) {
//     var code = parseInt(e.detail.code);
//     switch (code) {
//         case 8:
//             input = input.slice(0, -1);
//             break;
//         case 06:
//             alert('submitted');
//             var keyboard = document.querySelector('#keyboard');
//             document
//                 .querySelector('#input')
//                 .setAttribute('value', input);
//             document
//                 .querySelector('#input')
//                 .setAttribute('color', 'blue');
//             keyboard.parentNode.removeChild(keyboard);
//             return;
//         default:
//             input = input + e.detail.value;
//             break;
//     }
//     document
//         .querySelector('#input')
//         .setAttribute('value', input + '_');
// }
// document.addEventListener('a-keyboard-update', updateInput);

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
        this.text = this.el.sceneEl.querySelector(
            `#a-input-text-${this.data.id}`,
        );
        this.keyboard = this.el.sceneEl.querySelector(
            `#a-input-keyboard-${this.data.id}`,
        );
        this.holder = this.el.sceneEl.querySelector(
            `#a-input-holder-${this.data.id}`,
        );
        // Handlers
        this.onHolderClickHandler = this.onHolderClick.bind(this);
        this.onKeyboardUpdateHandler = this.onKeyboardUpdate.bind(this);
        // Events
        this.holder.addEventListener(
            'a-input-click',
            this.onHolderClickHandler,
        );
        document.addEventListener(
            'a-keyboard-update',
            this.onKeyboardUpdateHandler,
        );
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
        this.text.setAttribute('value', this.value);
    },
});
