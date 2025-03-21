AFRAME.registerTemplate(
    'env',
    /*html*/ ` 
    <!-- Assets --> 
    <a-assets>
        <a-asset-item
            id="track"
            src="/assets/models/env/track.glb"
        ></a-asset-item>
    </a-assets>
    <!-- Basic primitives -->
    <a-box
        id="table"
        width="5"
        depth="3"
        height="0.9"
        position="0 0 0"
        color="#ccc"
    ></a-box>
    <a-plane
        id="floor"
        position="0 0 0"
        rotation="-90 0 0"
        width="25"
        height="25"
        color="#000"
    ></a-plane>
    <!-- Env Models --> 
    <a-entity
        id="track-model"
        gltf-model="#track"
        scale="0.03 0.03 0.03"
        position="0 0.51 0.03"
    ></a-entity>
    <!-- Sounds -->
    <a-sound
        id="main-theme-sound"
        src="#main-theme"
        position="0 1 0"
        volume="0.4"
        loop="true"
    ></a-sound>
    `,
);
