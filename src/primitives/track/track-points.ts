import { car } from '@/config';

const width = 1.5 * 2; // Full width by X
const height = 0.76 * 2; // Full height by Z
const radius = 0.65; // Rounding radius

// Creates form with rounded corners
const shape = new THREE.Shape();
shape.moveTo(-width / 2 + radius, -height / 2); // We start from the bottom left edge, taking into account the rounding
shape.lineTo(width / 2 - radius, -height / 2); // The lower horizontal line

// Lower right corner
shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);

// Right vertical line
shape.lineTo(width / 2, height / 2 - radius);

// Upper right corner
shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);

// Upper horizontal line
shape.lineTo(-width / 2 + radius, height / 2);

// Upper left corner
shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);

// Left vertical line
shape.lineTo(-width / 2, -height / 2 + radius);

// Lower left corner
shape.quadraticCurveTo(
    -width / 2,
    -height / 2,
    -width / 2 + radius,
    -height / 2,
);

export const shapePoints = shape.getSpacedPoints(500);
export const totalPoints = shapePoints.length;
export const shapePoints3D = shapePoints.map(
    (point) => new THREE.Vector3(point.x, car.top, point.y),
);
