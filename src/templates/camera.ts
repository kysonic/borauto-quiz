AFRAME.registerTemplate(
    'camera',
    /*html*/ ` 
    <a-entity id="rig" camera-holder>
        <a-entity
            camera
            look-controls="enabled: false"
            orbit-controls="target: 0 1 0; minDistance: 1; maxDistance: 2; initialPosition: 0 2.5 -3; rotateSpeed: 0.5; maxPolarAngle: 90"
        ></a-entity>
        <a-entity
            id="right-controller"
            laser-controls="hand: right"
        ></a-entity>
        <a-entity
            id="left-controller"
            laser-controls="hand: left"
        ></a-entity>
    </a-entity>
    `,
);
