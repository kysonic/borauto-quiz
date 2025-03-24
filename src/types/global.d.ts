import Alpine from 'alpinejs';

declare global {
    const AFRAME: typeof import('aframe');
    const THREE: typeof import('three');
}
declare global {
    interface Window {
        domUi: any;
        Alpine: Alpine;
    }
}

export {};
