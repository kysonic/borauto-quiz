AFRAME.registerTemplate(
    'ui',
    /*html*/ ` 
    <a-entity
        id="ui-vr"
        position="0.02719 0.49 -1.31"
        rotation="-99 0 180"
    >
        <a-plane
            width="1"
            height="0.3"
            color="#333"
            opacity="0.8"
        ></a-plane>
        <a-text
            id="speed-vr"
            align="center"
            color="#FFF"
            position="0 0 0"
            width="0.9"
            text="value: 0"
        ></a-text>
        <a-text
            id="gear-vr"
            align="center"
            color="#FFF"
            position="-0.1 0 0"
            width="0.9"
            text="value: 0"
        ></a-text>
        <a-text
            id="rpm-vr"
            align="center"
            color="#FFF"
            position="0.1 0 0"
            width="0.9"
            text="value: 0"
        ></a-text>
    </a-entity>
    `,
);
