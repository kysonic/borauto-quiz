import { formatTime } from '../lib/time';
import questions from '../data/questions.json';
import { maxNitro } from '../config';

AFRAME.registerState({
    initialState: {
        speed: 0,
        gear: 1,
        rpm: 800,
        time: 30 * 1000,
        laps: 0,
        currentQuestion: questions[0],
        alreadyTakenQuestions: [],
        questionNumber: 0,
        nitro: 1,
        topScores: [],
        nosItems: [],
        topScoresItems: [],
    },

    handlers: {
        increaseLaps(state, action) {
            state.laps += action.amount;
        },

        setLaps(state, action) {
            state.laps = action.laps;
        },

        setSpeed(state, action) {
            state.speed = Math.floor(action.speed);
        },

        setGear(state, action) {
            state.gear = action.gear;
        },

        setRpm(state, action) {
            state.rpm = action.rpm;
        },

        setTime(state, action) {
            state.time = action.time;
        },

        setCurrentQuestion(state, action) {
            state.currentQuestion = action.question;
        },

        pushAlreadyTakenQuestion(state, action) {
            state.alreadyTakenQuestions.push(action.id);
        },

        setQuestionNumber(state, action) {
            state.questionNumber = action.number;
        },

        increaseNitro(state) {
            state.nitro++;
        },

        useNitro(state) {
            state.nitro--;
        },

        setNitro(state, action) {
            state.nitro = action.nitro;
        },

        setTopScores(state, action) {
            state.topScores = action.topScores;
        },
    },

    computeState(newState) {
        newState.vrRpm = `0 0 ${-((newState.rpm / 1000) * 45)}`;
        newState.domRpm = (newState.rpm / 1000) * 45;
        newState.formattedTime = formatTime(newState.time);
        newState.questionNumberVr = `Вопрос номер ${newState.questionNumber}:`;
    },
});
