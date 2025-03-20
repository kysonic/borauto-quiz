import { Font } from '../../config';

AFRAME.registerTemplate(
    'top-scores',
    /*html*/ ` 
    <a-entity id="top-scores-vr" ui-switcher="ui: top-scores" top-scores-manager>
        <a-rounded position="-1 0.6 -0.4" opacity="0.2" color="#000" width="2" height="1.5" radius="0.1"></a-rounded>
        <a-text
            position="0 2 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="ЛУЧШИЕ 10 РЕЗУЛЬТАТОВ"
            width="2"
            color="#FFF"
        ></a-text>
        <a-entity bind-for="for: item; in: topScoresItems; key: name;">
            <template>
                <a-text
                    position="0.8 {{y}} -0.5"
                    rotation="0 180 0"
                    align="left"
                    font="${Font}"
                    value="{{item.name}}"
                    width="2"
                    color="#FFF"
                ></a-text>
                <a-text
                    position="-0.7 {{y}} -0.5"
                    rotation="0 180 0"
                    align="left"
                    font="${Font}"
                    value="{{item.score}}"
                    width="2"
                    color="#FFF"
                ></a-text>
            </template>
        </a-entity>
        <a-text
            position="0 0.75 -0.43"
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
