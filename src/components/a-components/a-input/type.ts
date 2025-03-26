import type { Entity } from 'aframe';

export interface IKeyboardEvent extends CustomEvent {
    code: string;
    value: string;
}

export interface AInputComponent {
    el: Entity;

    data: {
        id?: string;
        textColor?: string;
        placeholder?: string;
        max?: number;
    };

    value: string;
    holder: Entity | null;
    text: Entity | null;
    keyboard: Entity | null;

    // Handlers
    onHolderClickHandler: () => void;
    onKeyboardUpdateHandler: (e: Event) => void;
    // Methods
    createElements: () => void;
    onHolderClick: () => void;
    onKeyboardUpdate: (e: Event) => void;
    createHolder: () => void;
    createText: () => void;
    createKeyboard: () => void;
}
