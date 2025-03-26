import { ACamera, AssertType } from '@/types/common';

AFRAME.registerComponent('camera-holder', {
    setVrCameraConfigHandler: () => {},
    startGameHandler: () => {},
    backToStartHandler: () => {},

    init() {
        // Handlers
        this.setVrCameraConfigHandler = this.setVrCameraConfig.bind(this);
        this.startGameHandler = this.startGame.bind(this);
        this.backToStartHandler = this.backToStart.bind(this);
        // Events
        this.el?.sceneEl?.addEventListener(
            'enter-vr',
            this.setVrCameraConfigHandler,
        );
        this.el?.sceneEl?.addEventListener('game-start', this.startGameHandler);
        this.el?.sceneEl?.addEventListener(
            'back-to-start',
            this.backToStartHandler,
        );
    },

    remove() {
        this.el?.sceneEl?.removeEventListener(
            'enter-vr',
            this.setVrCameraConfigHandler,
        );
        this.el?.sceneEl?.removeEventListener(
            'game-start',
            this.startGameHandler,
        );
    },

    setVrCameraConfig() {
        this.el.setAttribute('position', '0 0 -1.6');
        this.el.setAttribute('rotation', '0 180 0');
        AssertType<ACamera>(this.el?.sceneEl?.camera).el.setAttribute(
            'look-controls',
            'enabled: false',
        );
        AssertType<ACamera>(this.el?.sceneEl?.camera).el.setAttribute(
            'position',
            '0, 3.5, 0',
        );
        AssertType<ACamera>(this.el?.sceneEl?.camera).el.removeAttribute(
            'orbit-controls',
        );
    },

    backToStart() {
        AssertType<ACamera>(this.el?.sceneEl?.camera).el.setAttribute(
            'orbit-controls',
            {
                autoRotate: 'true',
                target: '0 1 0',
                initialPosition: '0 2 -3',
                minDistance: 1,
                maxDistance: 2,
                rotateSpeed: 0.5,
                maxPolarAngle: 90,
            },
        );
    },

    startGame() {
        const isInVR = this.el?.sceneEl?.is('vr-mode');

        if (!isInVR) {
            AssertType<ACamera>(this.el?.sceneEl?.camera).el.removeAttribute(
                'orbit-controls',
            );
            AssertType<ACamera>(this.el?.sceneEl?.camera).el.setAttribute(
                'orbit-controls',
                {
                    autoRotate: 'false',
                    target: '0 1 0',
                    initialPosition: '0 2 -3',
                    minDistance: 1,
                    maxDistance: 2,
                    rotateSpeed: 0.5,
                    maxPolarAngle: 90,
                },
            );
        }
    },
});
