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
            value="Лучшие 10 результатов"
            width="1.5"
            color="#FFF"
        ></a-text>
    </a-entity>
  `,
);
