import { formatTime } from '@/lib/time';
import questions from '@/data/questions.json';
import { DoubleState } from './double-state';
import { IQuiz, Question, TopScore, UIMode } from '@/types/common';
import { config, PagesType } from '@/config';
import { mapObjectValues } from '@/lib/common';
import { ActionType, StateType } from './type';

export const initialState = {
    speed: 0,
    gear: 1,
    rpm: 800,
    vrRpm: '',
    time: 30 * 1000,
    formattedTime: '',
    laps: 0,
    currentQuestion: questions[0],
    alreadyTakenQuestions: [] as number[],
    questionNumber: 0,
    questionNumberVr: '',
    nitro: 1,
    topScores: [] as TopScore[],
    nosItems: [],
    topScoresItems: [],
    soundEnabled: false,
    uiMode: UIMode.dom,
    page: config.pages.Start,
    selectedPages: mapObjectValues(
        config.pages,
        (page: string) => page === 'start',
    ),
    showCountdown: false,
    countdown: 3,
    // Because a-frame state component cannot interpolate conditions we have to use it in state...
    countdownColors: {
        first: 'red',
        second: '#ccc',
    },
    quiz: { success: -1, fail: -1 } as IQuiz,
    // Because a-frame state component cannot interpolate conditions we have to use it in state...
    quizButtons: {
        one: '#995cff',
        two: '#995cff',
        three: '#995cff',
        four: '#995cff',
    },
};

const handlers = {
    increaseLaps(state: StateType, action: ActionType<number>) {
        state.laps += action.amount;
    },

    setLaps(state: StateType, action: ActionType<number>) {
        state.laps = action.laps;
    },

    setSpeed(state: StateType, action: ActionType<number>) {
        state.speed = Math.floor(action.speed);
    },

    setGear(state: StateType, action: ActionType<number>) {
        state.gear = action.gear;
    },

    setRpm(state: StateType, action: ActionType<number>) {
        state.rpm = action.rpm;
        state.vrRpm = `0 0 ${-((state.rpm / 1000) * 45)}`;
    },

    setTime(state: StateType, action: ActionType<number>) {
        state.time = action.time;
        state.formattedTime = formatTime(state.time);
    },

    setCurrentQuestion(state: StateType, action: ActionType<Question>) {
        state.currentQuestion = action.question;
    },

    pushAlreadyTakenQuestion(state: StateType, action: ActionType<number>) {
        state.alreadyTakenQuestions.push(action.id);
    },

    setQuestionNumber(state: StateType, action: ActionType<number>) {
        state.questionNumber = action.number;
        state.questionNumberVr = `Вопрос номер ${state.questionNumber}:`;
    },

    increaseNitro(state: StateType) {
        state.nitro++;
    },

    useNitro(state: StateType) {
        state.nitro--;
    },

    setNitro(state: StateType, action: ActionType<number>) {
        state.nitro = action.nitro;
    },

    setTopScores(state: StateType, action: ActionType<TopScore[]>) {
        state.topScores = action.topScores;
    },

    setUiMode(state: StateType, action: ActionType<UIMode>) {
        state.uiMode = action.mode;
    },

    setPage(state: StateType, action: ActionType<PagesType>) {
        state.page = action.page;
        state.selectedPages = mapObjectValues(
            config.pages,
            (page: string) => state.page === page,
        );
    },

    setShowCountdown(state: StateType, action: ActionType<boolean>) {
        state.showCountdown = action.show;
    },

    setCountdown(state: StateType, action: ActionType<number>) {
        state.countdown = action.countdown;
        // VR UI
        state.countdownColors = {
            first: state.countdown ? 'red' : '#ccc',
            second: !state.countdown ? 'green' : '#ccc',
        };
    },

    setQuiz(state: StateType, action: ActionType<IQuiz>) {
        state.quiz = action.quiz;
        // VR UI
        state.quizButtons = {
            one:
                state.quiz.success === 1
                    ? 'green'
                    : state.quiz.fail === 1
                    ? 'red'
                    : '#995cff',
            two:
                state.quiz.success === 2
                    ? 'green'
                    : state.quiz.fail === 2
                    ? 'red'
                    : '#995cff',
            three:
                state.quiz.success === 3
                    ? 'green'
                    : state.quiz.fail === 3
                    ? 'red'
                    : '#995cff',
            four:
                state.quiz.success === 4
                    ? 'green'
                    : state.quiz.fail === 4
                    ? 'red'
                    : '#995cff',
        };
    },
};

DoubleState(initialState, handlers);
