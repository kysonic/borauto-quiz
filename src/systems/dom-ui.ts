const stateMap = {
    increaseLaps: 'laps',
    setSpeed: 'speed',
    setGear: 'gear',
    setRpm: 'domRpm',
    setTime: 'formattedTime',
};

const config = {
    increaseLaps: (value) =>
        (document.getElementById('laps-number-dom').textContent = value),
    setSpeed: (value) =>
        (document.getElementById('speed-number-dom').textContent = value),
    setGear: (value) =>
        (document.getElementById('gear-number-dom').textContent = value),
    setRpm: (value) =>
        (document.getElementById(
            'arrow-dom',
        ).style.transform = `rotate(${value}deg)`),
    setTime: (value) =>
        (document.getElementById('timer-number-dom').textContent = value),
};

AFRAME.registerSystem('dom-ui', {
    init() {
        this.stateUpdateHandler = this.stateUpdate.bind(this);
        this.sceneEl.addEventListener('stateupdate', this.stateUpdateHandler);
    },

    stateUpdate(e) {
        const action = e.detail.action;
        const state = this.sceneEl.systems.state.state;

        config[action]?.(state[stateMap[action]]);
    },
});
