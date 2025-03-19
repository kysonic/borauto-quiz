import { Font } from '../../config';

AFRAME.registerTemplate(
    'how-to-play',
    /*html*/ ` 
    <a-entity id="how-to-play-vr" ui-switcher="ui: how-to-play">
        <a-rounded position="-0.8 0.5 -0.3" opacity="0.2" color="#000" width="1.6" height="1.6" radius="0.1"></a-rounded>
        <a-text
            position="0.72 1.9 -0.33"
            rotation="0 180 0"
            align="left"
            font="${Font}"
            value="1. Игра состоит из двух частей - гонка и ответы на вопросы."
            whiteSpace="nowrap"
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0.72 1.75 -0.33"
            rotation="0 180 0"
            align="left"
            font="${Font}"
            value="2. В гонке вам дается 30 секунд чтобы пройти максимальное количество кругов."
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0.72 1.55 -0.33"
            rotation="0 180 0"
            align="left"
            font="${Font}"
            value="3. Вы можете набирать скорость, переключать передачи (см. управление). Рулить не нужно - все автоматически."
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0.72 1.4 -0.33"
            rotation="0 180 0"
            align="left"
            font="${Font}"
            value="4. У вас есть нитро (NOS) чтобы ускориться."
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0.72 1.27 -0.33"
            rotation="0 180 0"
            align="left"
            font="${Font}"
            value="5. На этапе вопросов - вам нужно правильно ответить на них."
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0.72 1.11 -0.33"
            rotation="0 180 0"
            align="left"
            font="${Font}"
            value="6. За каждый правильный ответ вы получаете очко нитро."
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0.72 0.95 -0.33"
            rotation="0 180 0"
            align="left"
            font="${Font}"
            value="7. После 3 циклов - игра окончена - победит тот, кто проедет больше кругов!"
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0 0.7 -0.33"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="НАЗАД"
            width="1.5"
            color="#FFF"
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
