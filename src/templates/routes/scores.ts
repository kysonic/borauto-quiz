import { Font } from '../../config';

AFRAME.registerTemplate(
    'scores',
    /*html*/ ` 
    <a-entity id="scores-vr" ui-switcher="ui: scores" score-manager>
        <a-rounded position="-1 1 -0.4" opacity="0.2" color="#000" width="2" height="1" radius="0.1"></a-rounded>
        <a-text
            position="0.2 1.9 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="Вы проехали"
            width="2"
            color="#FFF"
        ></a-text>
        <a-text
            position="-0.15 1.9 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="10"
            bind__value="laps"
            width="3"
            color="#cbbae7"
        ></a-text>
        <a-text
            position="-0.38 1.9 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="кругов"
            width="2"
            color="#FFF"
        ></a-text>
        <a-entity
            id="enter-name-input-vr"
            position="0.32 1.4 -0.6"
            rotation="0 180 0"
            scale="0.5 0.5 0.5"
            a-input="id: enterName; placeholder: Введите имя; max: 20;"
        ></a-entity>
        <a-text
            id="error-text-vr"
            position="-0.05 1.35 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value=""
            width="1.5"
            color="#cbbae7"
        ></a-text>
        <a-text
            id="send-score-button-vr"
            position="-0.05 1.15 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="ОТПРАВИТЬ"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="collidable"
                id="answer-4-vr"
                event-emit__common="__event: mouseup; __emit: submit-score"
                event-set__mouseenter="material.opacity: 0.5"
                event-set__mouseleave="material.opacity: 1"
                material="color: #995cff;"
                position="0 0 -0.01"
                width="0.7"
                height="0.15"
                depth="0.01"
            >
            </a-box>
        </a-text>
    </a-entity>
  `,
);
