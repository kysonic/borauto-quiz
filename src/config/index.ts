export const config = {
    common: {
        questionPerRound: 3,

        ui: {
            Font: '/assets/fonts/Roboto-Regular-msdf.json',
        },
    },

    pages: {
        Start: 'start',
        Quiz: 'quiz',
        Game: 'game',
        Scores: 'scores',
        TopScores: 'top-scores',
        Controls: 'controls',
        HowToPlay: 'how-to-play',
    },

    car: {
        top: 0.52,
        gearSettings: {
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
                maxRPM: 6000,
                curve: [0.01, 0.4, 0.8, 0.95, 0.6, 0.3, 0.05],
            },
            4: {
                maxSpeed: 70,
                peakAcceleration: 1.8,
                optimalRPM: 5000,
                maxRPM: 6300,
                curve: [0.01, 0.3, 0.7, 0.9, 0.8, 0.4, 0.08],
            },
            5: {
                maxSpeed: 130,
                peakAcceleration: 1.2,
                optimalRPM: 5500,
                maxRPM: 6300,
                curve: [0.001, 0.2, 0.6, 0.85, 0.5, 0.3, 0.08],
            },
            6: {
                maxSpeed: 180,
                peakAcceleration: 1.01,
                optimalRPM: 5800,
                maxRPM: 6500,
                curve: [0.001, 0.2, 0.6, 0.85, 0.5, 0.2, 0.02],
            },
        },
        controls: {
            desktop: {
                accelerate: 'Space',
                break: 'ShiftLeft',
                gearUp: 'ArrowUp',
                gearDown: 'ArrowDown',
                nitro: 'ControlLeft',
            },
        },
        maxNitro: 9,
        nitroMultiplayer: 4,
    },
};

export type GearType = (typeof config.car.gearSettings)['1'];
export type AvailableGears = keyof typeof config.car.gearSettings;
const gearConfig = Object.keys(config.car.gearSettings);
export const minGear = +gearConfig[0];
export const maxGear = +gearConfig[gearConfig.length - 1];
export type PagesType = (typeof config.pages)[keyof typeof config.pages];
