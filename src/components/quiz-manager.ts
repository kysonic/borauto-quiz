import { questionPerRound } from '../config';
import questions from '../data/questions.json';

AFRAME.registerComponent('quiz-manager', {
    schema: {
        ui: { type: 'string' },
    },

    init() {
        this.answered = false;
        this.answerHandler = this.answer.bind(this);
        // Sounds
        this.yeapSound = document.getElementById('yeap-sound-e');
        this.nopeSound = document.getElementById('nope-sound-e');
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
                : this.fail(answer, currentQuestion.correct);
            // Give some time to check answer
            setTimeout(() => {
                this.answeredQuestion(answer, currentQuestion.correct);
            }, 1000);
        }
    },

    success(answer) {
        this.el.sceneEl.emit('increaseNitro');
        this.yeapSound.components.sound.playSound();
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

    fail(answer, correct) {
        this.nopeSound.components.sound.playSound();
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.vrFail(answer, correct) : this.domFail(answer, correct);
    },

    domFail(answer, correct) {
        document.getElementById(`answer-${answer}-dom`).classList.add('fail');
        document
            .getElementById(`answer-${correct}-dom`)
            .classList.add('success');
    },

    vrFail(answer, correct) {
        const buttonNode = document.getElementById(`answer-${answer}-vr`);
        buttonNode.setAttribute('material', 'color: red');
        buttonNode.setAttribute(
            'animation',
            'property: rotation; to: 0 0 2; dur: 250; easing: linear; loop: true',
        );
        const correctButton = document.getElementById(`answer-${correct}-vr`);
        correctButton.setAttribute('material', 'color: green');
    },

    answeredQuestion(answer, correct) {
        this.answered = false;
        this.clear(answer, correct);
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

    clear(answer, correct) {
        const isInVR = this.el.sceneEl.is('vr-mode');
        isInVR ? this.vrClear(answer, correct) : this.domClear(answer, correct);
    },

    vrClear(answer, correct) {
        const buttonNode = document.getElementById(`answer-${answer}-vr`);
        const correctNode = document.getElementById(`answer-${correct}-vr`);
        [buttonNode, correctNode].forEach((node) => {
            node.setAttribute('material', 'color: #995cff');
            node.setAttribute('scale', '1 1 1');
            node.setAttribute('rotation', '0 0 0');
            node.removeAttribute('animation');
        });
    },

    domClear(answer, correct) {
        const answerNode = document.getElementById(`answer-${answer}-dom`);
        const correctNode = document.getElementById(`answer-${correct}-dom`);
        [answerNode, correctNode].forEach((node) => {
            node.classList.remove('success');
            node.classList.remove('fail');
        });
    },
});
