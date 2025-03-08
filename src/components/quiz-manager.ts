import { questionPerRound } from '../config';
import questions from '../data/questions.json';

AFRAME.registerComponent('quiz-manager', {
    schema: {
        ui: { type: 'string' },
    },

    init() {
        this.answered = false;
        this.answerHandler = this.answer.bind(this);
        // Events
        this.el.sceneEl.addEventListener('answer', this.answerHandler);
        // Init
        this.takeQuestion();
    },

    remove() {
        this.el.sceneEl.removeEventListener('answer', this.answerHandler);
    },

    takeQuestion() {
        const question =
            questions[Math.floor(Math.random() * questions.length)];
        const takenQuestions =
            this.el.sceneEl.systems.state.state.alreadyTakenQuestions;
        const questionNumber =
            this.el.sceneEl.systems.state.state.questionNumber;

        // Take another question in the session if it is already taken
        if (takenQuestions.includes(question.id)) {
            return this.takeQuestion();
        }

        this.el.sceneEl.emit('pushAlreadyTakenQuestion', { id: question.id });
        this.el.sceneEl.emit('setCurrentQuestion', { question });
        this.el.sceneEl.emit('setQuestionNumber', {
            number: questionNumber + 1,
        });
    },

    answer(e) {
        if (!this.answered) {
            this.answered = true;
            const answer = e.detail.answer;
            const currentQuestion =
                this.el.sceneEl.systems.state.state.currentQuestion;

            currentQuestion.correct === answer
                ? this.success(answer)
                : this.fail(answer);
            // Give some time to check answer
            setTimeout(() => {
                this.answeredQuestion(answer);
            }, 1000);
        }
    },

    success(answer) {
        this.el.sceneEl.emit('increaseNitro');
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.vrSuccess(answer) : this.domSuccess(answer);
    },

    domSuccess(answer) {
        document
            .getElementById(`answer-${answer}-dom`)
            .classList.add('success');
    },

    vrSuccess(answer) {
        const buttonNode = document.getElementById(`answer-${answer}-vr`);
        buttonNode.setAttribute('material', 'color: green');
        buttonNode.setAttribute(
            'animation',
            'property: scale; to: 1.1 1.1 1.1; dur: 1000; easing: linear; loop: true',
        );
    },

    fail(answer) {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.vrFail(answer) : this.domFail(answer);
    },

    domFail(answer) {
        document.getElementById(`answer-${answer}-dom`).classList.add('fail');
    },

    vrFail(answer) {
        const buttonNode = document.getElementById(`answer-${answer}-vr`);
        buttonNode.setAttribute('material', 'color: red');
        buttonNode.setAttribute(
            'animation',
            'property: rotation; to: 0 0 2; dur: 250; easing: linear; loop: true',
        );
    },

    answeredQuestion(answer) {
        this.answered = false;
        this.clear(answer);
        const questionNumber =
            this.el.sceneEl.systems.state.state.questionNumber;
        if (questionNumber >= questionPerRound) {
            this.el.sceneEl.emit('setQuestionNumber', {
                number: 0,
            });
            return this.el.sceneEl.emit('quiz-finished');
        }
        this.takeQuestion();
    },

    clear(answer) {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.vrClear(answer) : this.domClear(answer);
    },

    vrClear(answer) {
        const buttonNode = document.getElementById(`answer-${answer}-vr`);
        buttonNode.setAttribute('material', 'color: #995cff');
        buttonNode.setAttribute('scale', '1 1 1');
        buttonNode.setAttribute('rotation', '0 0 0');
        buttonNode.removeAttribute('animation');
    },

    domClear(answer) {
        document
            .getElementById(`answer-${answer}-dom`)
            .classList.remove('success');
        document
            .getElementById(`answer-${answer}-dom`)
            .classList.remove('fail');
    },
});
