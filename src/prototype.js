import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls, car;
let t = 0;
let currentGear = 1;
let isShifting = false;
let rpm = 800;
let speed = 0;
let throttle = 0;

const gearSettings = {
    1: { maxSpeed: 20,  acceleration: 0.15, rpmMultiplier: 35, maxRpm: 6500 },
    2: { maxSpeed: 40,  acceleration: 0.12, rpmMultiplier: 30, maxRpm: 6500 },
    3: { maxSpeed: 80,  acceleration: 0.09, rpmMultiplier: 25, maxRpm: 6500 },
    4: { maxSpeed: 120, acceleration: 0.06, rpmMultiplier: 20, maxRpm: 6500 },
    5: { maxSpeed: 180, acceleration: 0.03, rpmMultiplier: 15, maxRpm: 6500 }
};

function init() {
    // Инициализация сцены
    scene = new THREE.Scene();
    
    // Настройка камеры
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 50);
    camera.lookAt(0, 0, 0);
    
    // Настройка рендерера
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Настройка управления камерой
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Создание машины
    const carGeometry = new THREE.BoxGeometry(2, 1, 1);
    const carMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        shininess: 100
    });
    car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.set(30, 0.5, 0); // Начальная позиция
    scene.add(car);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 100, 100);
    scene.add(directionalLight);

    // Создание трассы
    createTrack();
}

function createTrack() {
    const points = [];
    for(let i = 0; i < Math.PI * 2; i += 0.1) {
        points.push(new THREE.Vector3(
            Math.sin(i) * 30,
            0,
            Math.sin(i * 2) * 15
        ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const track = new THREE.Line(geometry, material);
    scene.add(track);
}

function shiftGear(up) {
    if(isShifting) return;
    const newGear = currentGear + (up ? 1 : -1);
    
    if(newGear < 1 || newGear > 5) return;
    
    isShifting = true;
    currentGear = newGear;
    
    // Эффект переключения передачи
    setTimeout(() => {
        isShifting = false;
        rpm = Math.max(800, rpm - 500);
    }, 300);
}

function updatePhysics() {
    const gear = gearSettings[currentGear];
    const speedRatio = speed / gear.maxSpeed;
    
    if(throttle === 0) {
        // Естественное замедление
        speed *= 0.993;
        rpm *= 0.97;
    } else {
        // Расчет ускорения
        let acceleration = gear.acceleration * (1 - speedRatio);
        acceleration *= throttle * (rpm > 5000 ? 0.8 : 1);
        speed += acceleration;
        
        // Ограничение скорости
        speed = Math.min(speed, gear.maxSpeed);
    }

    // Расчет оборотов
    rpm = 800 + (speed * gear.rpmMultiplier);
    rpm = Math.min(rpm, gear.maxRpm);

    // Ограничение при красной зоне
    if(rpm >= gear.maxRpm - 200) {
        speed *= 0.995;
        rpm = gear.maxRpm - 200;
    }
}

function updateCarPosition() {
    t += speed * 0.0007;
    
    // Траектория в виде восьмерки
    const x = Math.sin(t) * 30;
    const z = Math.sin(t * 2) * 15;
    
    car.position.set(x, 0.5, z);
    
    // Плавный поворот
    const dx = Math.cos(t) * 30;
    const dz = Math.cos(t * 2) * 30;
    car.rotation.y = Math.atan2(dx, dz) + Math.PI/2;
}

function updateUI() {
    document.getElementById('speed').textContent = Math.floor(speed);
    document.getElementById('gear').textContent = currentGear;
    document.getElementById('rpm').textContent = Math.floor(rpm);
    document.querySelector('.rpm-fill').style.width = `${(rpm/6500)*100}%`;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    updatePhysics();
    updateCarPosition();
    updateUI();
    
    renderer.render(scene, camera);
}

// Управление
window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowUp':
            throttle = 1;
            break;
        case 'ArrowDown':
            throttle = -0.7;
            break;
        case 'Space':
            shiftGear(true);
            break;
        case 'ShiftLeft':
            shiftGear(false);
            break;
    }
});

window.addEventListener('keyup', (e) => {
    if(e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        throttle = 0;
    }
});

// Запуск
init();
animate();

// Обработчик изменения размера
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
