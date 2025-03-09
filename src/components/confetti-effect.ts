AFRAME.registerComponent('confetti-effect', {
    schema: {
        position: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
        particleCount: { type: 'number', default: 1000 },
        size: { type: 'number', default: 0.1 },
        gravity: { type: 'number', default: -0.001 },
        bounce: { type: 'number', default: -0.6 },
        border: { type: 'number', default: 1 },
    },

    init() {
        this.particleGroup = new THREE.Group();
        this.particleGroup.position.set(
            this.data.position.x,
            this.data.position.y,
            this.data.position.z,
        );
        this.el.object3D.add(this.particleGroup);

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];

        for (let i = 0; i < this.data.particleCount; i++) {
            positions.push(
                Math.random() * this.data.border, // X
                Math.random() * this.data.border, // Y
                Math.random() * this.data.border, // Z
            );

            colors.push(
                Math.random(), // R
                Math.random(), // G
                Math.random(), // B
            );
        }

        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3),
        );
        geometry.setAttribute(
            'color',
            new THREE.Float32BufferAttribute(colors, 3),
        );

        const material = new THREE.PointsMaterial({
            size: this.data.size,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
        });

        this.particles = new THREE.Points(geometry, material);
        this.particleGroup.add(this.particles);

        this.velocities = [];
        for (let i = 0; i < this.data.particleCount; i++) {
            this.velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: -Math.random() * 0.02,
                z: (Math.random() - 0.5) * 0.02,
            });
        }
    },

    update(oldData) {
        if (oldData.position !== this.data.position) {
            this.particleGroup.position.set(
                this.data.position.x,
                this.data.position.y,
                this.data.position.z,
            );
        }
    },

    tick() {
        const positions = this.particles.geometry.attributes.position.array;

        for (let i = 0; i < this.data.particleCount; i++) {
            positions[i * 3] += this.velocities[i].x;
            positions[i * 3 + 1] += this.velocities[i].y;
            positions[i * 3 + 2] += this.velocities[i].z;

            this.velocities[i].y += this.data.gravity;

            if (positions[i * 3 + 1] < -5) {
                this.velocities[i].y *= this.data.bounce;
                positions[i * 3 + 1] = -5;
            }

            this.velocities[i].x += (Math.random() - 0.5) * 0.002;
            this.velocities[i].z += (Math.random() - 0.5) * 0.002;
        }

        this.particles.geometry.attributes.position.needsUpdate = true;
    },

    remove() {
        this.el.object3D.remove(this.particleGroup);
    },
});
