const width = 3 * 2; // Полная ширина по X
const height = 1.5 * 2; // Полная высота по Z
const radius = 1.2; // Радиус скругления

// Создаем форму с закруглёнными углами
const shape = new THREE.Shape();
shape.moveTo(-width / 2 + radius, -height / 2); // Начинаем от нижнего левого края с учетом скругления
shape.lineTo(width / 2 - radius, -height / 2); // Нижняя горизонтальная линия

// Нижний правый угол
shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);

// Правая вертикальная линия
shape.lineTo(width / 2, height / 2 - radius);

// Верхний правый угол
shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);

// Верхняя горизонтальная линия
shape.lineTo(-width / 2 + radius, height / 2);

// Верхний левый угол
shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);

// Левая вертикальная линия
shape.lineTo(-width / 2, -height / 2 + radius);

// Нижний левый угол
shape.quadraticCurveTo(
    -width / 2,
    -height / 2,
    -width / 2 + radius,
    -height / 2,
);

export const shapePoints = shape.getSpacedPoints(500);
export const totalPoints = shapePoints.length;
