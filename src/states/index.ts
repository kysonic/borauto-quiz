import { formatTime } from '@/lib/time';
import questions from '@/data/questions.json';
import { DoubleState } from './double-state';
import { Question, TopScore } from '@/types/common';
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
    soundEnabled: true,
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
};

DoubleState(initialState, handlers);
