import { shapePoints } from './track-points';

AFRAME.registerComponent('track', {
    schema: {
        color: { type: 'color', default: '#FFF' },
    },
    init() {
        const geometry = new THREE.BufferGeometry().setFromPoints(shapePoints);
        const material = new THREE.LineBasicMaterial({
            color: this.data.color,
        });
        this.line = new THREE.Line(geometry, material);
        this.el.setObject3D('line', this.line);
    },

    remove() {
        // Cleanup when component or entity is removed
        if (this.line) {
            this.el.removeObject3D('line');
            this.line = null;
        }
    },
});

AFRAME.registerPrimitive('a-track', {
    defaultComponents: {
        track: {
            color: '#FFF',
        },
    },
});
