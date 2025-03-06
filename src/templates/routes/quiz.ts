import { Font } from '../../config';

AFRAME.registerTemplate(
    'quiz',
    /*html*/ ` 
    <a-entity id="quiz-vr" ui-switcher="ui: quiz">
        <a-rounded position="-1 0.6 -0.4" opacity="0.2" color="#000" width="2" height="1.5" radius="0.1"></a-rounded>
        <a-text
            position="0 1.6 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных?"
            width="1.5"
            color="#FFF"
        ></a-text>
        <!-- Buttons -->
        <a-text
            position="0.5 1 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="ОТВЕТ 1"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="intersect"
                event-emit__common="__event: mouseup; __emit: quiz-start"
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
        <a-text
            position="-0.5 1 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="ОТВЕТ 2"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="intersect"
                event-emit__common="__event: mouseup; __emit: quiz-start"
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
        <a-text
            position="0.5 0.8 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="ОТВЕТ 3"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="intersect"
                event-emit__common="__event: mouseup; __emit: quiz-start"
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
        <a-text
            position="-0.5 0.8 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="ОТВЕТ 4"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="intersect"
                event-emit__common="__event: mouseup; __emit: quiz-start"
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
