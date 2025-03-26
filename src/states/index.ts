import { formatTime } from '@/lib/time';
import questions from '@/data/questions.json';
import { DoubleState } from './double-state';
import { Question, TopScore, UIMode } from '@/types/common';
import { ActionType, StateType } from './type';
import { config, PagesType } from '@/config';
import { mapObjectValues } from '@/lib/common';

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
    selectedPages: {
        Start: true,
    },
    showCountdown: false,
    countdown: 3,
    countdownColors: {
        first: 'red',
        second: '#ccc',
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
        state.countdownColors = {
            first: state.countdown ? 'red' : '#ccc',
            second: !state.countdown ? 'green' : '#ccc',
        };
    },
};

DoubleState(initialState, handlers);
