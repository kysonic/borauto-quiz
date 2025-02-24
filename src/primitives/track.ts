AFRAME.registerGeometry('track', {
    init: function () {
        const points = [];
        for (let i = 0; i < Math.PI * 2; i += 0.1) {
            points.push(
                new THREE.Vector3(Math.sin(i) * 1, 0, Math.sin(i * 2) * 0.5),
            );
        }

        this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    },
});

interface LineShaderSchema {
    color?: string;
}

AFRAME.registerShader('line-shader', {
    schema: {
        color: { type: 'color', default: '#FFF' },
    },
    init: function (data: LineShaderSchema) {
        this.material = new THREE.LineBasicMaterial({
            color: new THREE.Color(data?.color ?? '#FFF'),
        });
    },
});

AFRAME.registerPrimitive('a-track', {
    defaultComponents: {
        geometry: {
            primitive: 'track',
        },
        material: { shader: 'line-shader' },
    },
    mappings: {
        color: 'material.color',
        position: 'geometry.position',
        scale: 'geometry.scale',
    },
});
