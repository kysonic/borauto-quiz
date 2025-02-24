let t = 0;

AFRAME.registerComponent('car', {
    schema: {
        speed: { default: 20 },
    },
    init() {
        console.log('Hello Car', this.el);
    },

    tick() {
        t += this.data.speed * 0.0007;

        // Траектория в виде восьмерки
        const x = Math.sin(t) * 1;
        const z = Math.sin(t * 2) * 0.5;

        this.el.object3D.position.set(x, 1.03, z - 4);

        // Плавный поворот
        const dx = Math.cos(t) * 1;
        const dz = Math.cos(t * 2) * 1;
        this.el.object3D.rotation.y = Math.atan2(dx, dz) + Math.PI / 2;
    },
});
