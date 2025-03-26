import questions from '@/data/questions.json';
import type { Entity, Component } from 'aframe';
import type * as THREE from 'three';

export function AssertType<T>(
    value: unknown,
    typeGuard?: (val: unknown) => val is T,
): T {
    if (typeGuard && !typeGuard(value)) {
        throw new Error('Type assertion failed');
    }
    return value as T;
}

export interface ISoundComponent {
    sound: {
        playSound: () => void;
        stopSound: () => void;
    };
}

export type ACamera = THREE.Camera & {
    el: Entity;
};

export type TopScore = {
    id: number;
    name: string;
    score: number;
};

export type Question = (typeof questions)[0];

export type IRouter = {
    changeRoute(name: string): void;
};

export enum UIMode {
    dom = 'DOM',
    vr = 'VR',
}
