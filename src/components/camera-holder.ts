AFRAME.registerComponent('camera-holder', {
    init() {
        this.el.sceneEl.addEventListener(
            'enter-vr',
            this.setVrCameraConfig.bind(this),
        );

        this.el.sceneEl.addEventListener(
            'game-start',
            this.startGame.bind(this),
        );
        this.el.sceneEl.addEventListener(
            'quiz-start',
            this.startGame.bind(this),
        );
    },

    setVrCameraConfig() {
        this.el.setAttribute('position', '0 0 -1.6');
        this.el.setAttribute('rotation', '0 180 0');
        this.el.sceneEl.camera.el.setAttribute(
            'look-controls',
            'enabled: false',
        );
        this.el.sceneEl.camera.el.setAttribute('position', '0, 3.5, 0');
        this.el.sceneEl.camera.el.removeAttribute('orbit-controls');
    },

    startGame() {
        const isInVR = this.el.sceneEl.is('vr-mode');
        if (!isInVR) {
            this.el.sceneEl.camera.el.removeAttribute('orbit-controls');
            this.el.sceneEl.camera.el.setAttribute('orbit-controls', {
                autoRotate: 'false',
                target: '0 1 0',
                initialPosition: '0 2 -3',
                minDistance: 1,
                maxDistance: 2,
                rotateSpeed: 0.5,
                maxPolarAngle: 90,
            });
        }
    },
});
