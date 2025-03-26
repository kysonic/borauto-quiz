import type { Entity } from 'aframe';
import type * as THREE from 'three';

export interface ARoundedComponent {
    el: Entity;

    data: {
        enabled?: boolean;
        width?: number;
        height?: number;
        radius?: number;
        topLeftRadius?: number;
        topRightRadius?: number;
        bottomLeftRadius?: number;
        bottomRightRadius?: number;
        color?: string;
        opacity?: number;
    };

    rounded: THREE.Mesh | null;
    draw: () => THREE.ShapeGeometry;
    updateOpacity: () => void;
}
