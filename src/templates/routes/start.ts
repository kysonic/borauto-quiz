import { Font } from '../../config';

AFRAME.registerTemplate(
    'start',
    /*html*/ ` 
    <a-assets>
        <img id="logo-img" src="/assets/img/b-logo-w.png">
        <img id="quiz-img" src="/assets/img/quiz.png">
    </a-assets>
    
    <a-entity id="start-vr" ui-switcher="ui: start">
        <a-rounded position="-0.65 0.8 -0.4" opacity="0.2" color="#000" width="1.3" height="1" radius="0.1"></a-rounded>
        <a-image position="0 1.6 -0.41" width="0.8" height="0.2" rotation="0 180 0" src="#logo-img"></a-image>
        <a-image position="-0.48 1.7 -0.42" width=0.5" height="0.19" rotation="0 180 -45" src="#quiz-img"></a-image>
        <a-text
            position="0 1.3 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="НАЧАТЬ"
            width="2"
            color="#FFF"
            material="color: red;"
        >
            <a-box
                class="intersect"
                event-emit__common="__event: mouseup; __emit: game-start"
                event-set__mouseenter="material.opacity: 0.5"
                event-set__mouseleave="material.opacity: 1"
                sound="src: #click; on: mousedown; volume: 0.3"
                material="color: #995cff;"
                position="0 0 -0.01"
                width="1"
                height="0.15"
                depth="0.01"
            >
            </a-box>
        </a-text>
        <a-text
            position="0 1.1 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="УПРАВЛЕНИЕ"
            width="2"
            color="#FFF"
            material="color: red;"
        >
            <a-box
                class="intersect"
                event-emit__common="__event: mouseup; __emit: controls-start"
                event-set__mouseenter="material.opacity: 0.5"
                event-set__mouseleave="material.opacity: 1"
                material="color: #995cff;"
                position="0 0 -0.01"
                width="1"
                height="0.15"
                depth="0.01"
            >
            </a-box>
        </a-text>
    </a-entity>
  `,
);
