import type { Entity } from 'aframe';
import { config } from '@/config';
import questions from '@/data/questions.json';
import { AssertType, ISoundComponent } from '@/types/common';
import { StateSystem } from '@/states/type';
import { IAnswerEvent, IQuizManagerComponent } from './type';
import { wrapWithSoundEnabler } from '@/lib/common';

AFRAME.registerComponent<IQuizManagerComponent>('quiz-manager', {
    answered: false,
    yeapSound: null,
    nopeSound: null,
    answerHandler: (e: Event) => {},

    schema: {
        ui: { type: 'string' },
    },

    init() {
        this.answered = false;
        this.answerHandler = this.answer.bind(this);
        // Sounds
        this.yeapSound = AssertType<Entity>(
            document.getElementById('yeap-sound-e'),
        );
        this.nopeSound = AssertType<Entity>(
            document.getElementById('nope-sound-e'),
        );
        // Events
        this.el?.sceneEl?.addEventListener('answer', this.answerHandler);
        // Init
        this.takeQuestion();
    },

    remove() {
        this.el?.sceneEl?.removeEventListener('answer', this.answerHandler);
    },

    takeQuestion() {
        const stateSystem = AssertType<StateSystem>(
            this.el?.sceneEl?.systems.state,
        );
        const question =
            questions[Math.floor(Math.random() * questions.length)];
        const takenQuestions = stateSystem.state.alreadyTakenQuestions;
        const questionNumber = stateSystem.state.questionNumber;

        // Take another question in the session if it is already taken
        if (takenQuestions.includes(question.id)) {
            return this.takeQuestion();
        }

        this.el?.sceneEl?.emit('pushAlreadyTakenQuestion', { id: question.id });
        this.el?.sceneEl?.emit('setCurrentQuestion', { question });
        this.el?.sceneEl?.emit('setQuestionNumber', {
            number: questionNumber + 1,
        });
    },

    answer(e: Event) {
        const customEvent = e as CustomEvent<IAnswerEvent>;

        if (!this.answered) {
            this.answered = true;
            const answer = customEvent.detail.answer;
            const currentQuestion = AssertType<StateSystem>(
                this.el?.sceneEl?.systems.state,
            ).state.currentQuestion;

            currentQuestion.correct === answer
                ? this.success(answer)
                : this.fail(answer, currentQuestion.correct);

            this.el?.sceneEl?.emit('setQuiz', {
                quiz: {
                    success: currentQuestion.correct,
                    fail: answer !== currentQuestion.correct ? answer : -1,
                },
            });
            // Give some time to check answer
            setTimeout(() => {
                this.answeredQuestion(answer, currentQuestion.correct);
            }, 1000);
        }
    },

    success() {
        this.el?.sceneEl?.emit('increaseNitro');
        this.playYeapSound();
    },

    playYeapSound: function (this: IQuizManagerComponent) {
        AssertType<ISoundComponent>(
            this.yeapSound?.components,
        ).sound.playSound();
    },

    fail() {
        this.playNopeSound();
    },

    playNopeSound: wrapWithSoundEnabler(function (this: IQuizManagerComponent) {
        AssertType<ISoundComponent>(
            this.nopeSound?.components,
        ).sound.playSound();
    }),

    answeredQuestion() {
        this.answered = false;

        this.el?.sceneEl?.emit('setQuiz', {
            quiz: {
                success: -1,
                fail: -1,
            },
        });

        const questionNumber = AssertType<StateSystem>(
            this.el?.sceneEl?.systems.state,
        ).state.questionNumber;

        if (questionNumber >= config.common.questionPerRound) {
            this.el?.sceneEl?.emit('setQuestionNumber', {
                number: 0,
            });
            return this.el?.sceneEl?.emit('quiz-finished');
        }

        this.takeQuestion();
    },
});
