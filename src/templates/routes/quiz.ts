import { Font } from '../../config';

AFRAME.registerTemplate(
    'quiz',
    /*html*/ ` 
    <a-entity id="quiz-vr" ui-switcher="ui: quiz" quiz-manager>
        <a-rounded position="-1 0.6 -0.4" opacity="0.2" color="#000" width="2" height="1.5" radius="0.1"></a-rounded>
        <a-text
            position="0 2 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="Вопрос номер 0:"
            bind__value="questionNumberVr"
            width="1.5"
            color="#FFF"
        ></a-text>
        <a-text
            position="0 1.6 -0.43"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных?"
            bind__value="currentQuestion.question"
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
            bind__value="currentQuestion.answers[0]"
            width="1.5"
            color="#FFF"
        >
            <a-box
                id="answer-1-vr"
                class="intersect"
                event-emit__common="__event: mouseup; __emit: answer; detail: { answer: 1 }"
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
            bind__value="currentQuestion.answers[1]"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="intersect"
                id="answer-2-vr"
                event-emit__common="__event: mouseup; __emit: answer; detail: { answer: 2 }"
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
            bind__value="currentQuestion.answers[2]"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="intersect"
                id="answer-3-vr"
                event-emit__common="__event: mouseup; __emit: answer; detail: { answer: 3 }"
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
            bind__value="currentQuestion.answers[3]"
            width="1.5"
            color="#FFF"
        >
            <a-box
                class="intersect"
                id="answer-4-vr"
                event-emit__common="__event: mouseup; __emit: answer; detail: { answer: 4 }"
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
