AFRAME.registerComponent('camera-holder', {
    init() {
        this.el.sceneEl.addEventListener(
            'enter-vr',
            this.setVrCameraConfig.bind(this),
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
});
