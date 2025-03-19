import { Font } from '../../config';

AFRAME.registerTemplate(
    'controls',
    /*html*/ ` 
    <a-assets>
        <img id="controls-img" src="/assets/img/controls-vr.png">
    </a-assets>
    
    <a-entity id="controls-vr" ui-switcher="ui: controls">
        <a-rounded position="-0.75 0.8 -0.4" opacity="0.2" color="#000" width="1.5" height="1.3" radius="0.1"></a-rounded>
        <a-image position="0 1.6 -0.41" width="0.7" height="0.8" rotation="0 180 0" src="#controls-img"></a-image>
        <a-text
            position="0 1 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="НАЗАД"
            width="1.5"
            color="#FFF"
            material="color: red;"
        >
            <a-box
                class="collidable"
                event-emit__common="__event: mouseup; __emit: back-to-start"
                event-set__mouseenter="material.opacity: 0.5"
                event-set__mouseleave="material.opacity: 1"
                material="color: #995cff;"
                position="0 0 -0.01"
                width="0.6"
                height="0.15"
                depth="0.01"
            >
            </a-box>
        </a-text>
    </a-entity>
  `,
);
