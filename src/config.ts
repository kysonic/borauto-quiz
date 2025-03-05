export const car = {
    top: 0.52,
};

export const pages = {
    Start: 'start',
    Game: 'game',
    Score: 'score',
    Controls: 'controls',
    HowToPlay: 'how-to-play',
};

export const startPage = pages.Start;

export const gearSettings = {
    1: {
        maxSpeed: 10, // km/h
        peakAcceleration: 3.8,
        optimalRPM: 3500,
        maxRPM: 6200,
        curve: [0.1, 0.6, 0.9, 0.6, 0.3, 0.2, 0.005],
    },
    2: {
        maxSpeed: 30,
        peakAcceleration: 3.2,
        optimalRPM: 4000,
        maxRPM: 6200,
        curve: [0.05, 0.5, 0.85, 0.9, 0.5, 0.3, 0.2],
    },
    3: {
        maxSpeed: 50,
        peakAcceleration: 2.5,
        optimalRPM: 4500,
        maxRPM: 6200,
        curve: [0.01, 0.4, 0.8, 0.95, 0.6, 0.3, 0.05],
    },
    4: {
        maxSpeed: 70,
        peakAcceleration: 1.8,
        optimalRPM: 5000,
        maxRPM: 6200,
        curve: [0.01, 0.3, 0.7, 0.9, 0.8, 0.4, 0.08],
    },
    5: {
        maxSpeed: 90,
        peakAcceleration: 1.2,
        optimalRPM: 5500,
        maxRPM: 6200,
        curve: [0.001, 0.2, 0.6, 0.85, 0.5, 0.3, 0.08],
    },
};

export const controls = {
    desktop: {
        accelerate: 'Space',
        break: 'ShiftLeft',
        gearUp: 'ArrowUp',
        gearDown: 'ArrowDown',
    },
};
