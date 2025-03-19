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
    </a-entity>
  `,
);
