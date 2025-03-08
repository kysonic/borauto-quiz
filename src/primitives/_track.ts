AFRAME.registerComponent('track', {
    schema: {
        color: { type: 'color', default: '#FFF' },
    },
    init() {
        // const points = [];
        // for (let i = 0; i < Math.PI * 2; i += 0.1) {
        //     points.push(
        //         new THREE.Vector3(Math.sin(i) * 1.3, 0, Math.sin(i * 2) * 0.8),
        //     );
        // }
        const points = [];
        const a = 3; // Большая полуось
        const b = 2; // Малая полуось

        for (let i = 0; i < Math.PI * 2; i += 0.1) {
            points.push(
                new THREE.Vector3(
                    a * Math.cos(i), // X координата
                    0,
                    b * Math.sin(i), // Z координата
                ),
            );
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
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
