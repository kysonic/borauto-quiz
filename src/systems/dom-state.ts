const stateMap = {
    increaseLaps: 'laps',
    setLaps: 'laps',
    setSpeed: 'speed',
    setGear: 'gear',
    setRpm: 'domRpm',
    setTime: 'formattedTime',
    setCurrentQuestion: 'currentQuestion',
    setQuestionNumber: 'questionNumber',
    increaseNitro: 'nitro',
    useNitro: 'nitro',
    setNitro: 'nitro',
    setTopScores: 'topScores',
};

const nitroHandler = (value) => {
    const nitroNodes = document.querySelectorAll('.nos-item');
    for (let node of nitroNodes) {
        node.classList.remove('active');
    }

    for (let index in nitroNodes) {
        if (value > index) {
            nitroNodes[index].classList.add('active');
        }
    }
};

const lapsHandler = (value) => {
    const lapNode = document.getElementById('laps-number-dom');
    const scoresNode = document.getElementById('scores-laps-number-dom');
    if (lapNode) {
        lapNode.textContent = value;
    }
    if (scoresNode) {
        scoresNode.textContent = value;
    }
};

const config = {
    increaseLaps: lapsHandler,
    setLaps: lapsHandler,
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
    setCurrentQuestion: (value) => {
        document.getElementById('question-text-dom').textContent =
            value.question;
        document.getElementById('answer-1-dom').textContent = value.answers[0];
        document.getElementById('answer-2-dom').textContent = value.answers[1];
        document.getElementById('answer-3-dom').textContent = value.answers[2];
        document.getElementById('answer-4-dom').textContent = value.answers[3];
    },
    setQuestionNumber: (value) => {
        document.getElementById('question-number-dom').textContent = value;
    },

    increaseNitro: nitroHandler,
    useNitro: nitroHandler,
    setNitro: nitroHandler,

    setTopScores: (value) => {
        const resultsNode = document.getElementById('top-scores-results-dom');
        resultsNode.innerHTML = '';

        for (let result of value) {
            const div = document.createElement('div');
            div.classList.add('result');
            div.innerHTML = `
                <div class='name'>${result.name}</div>
                <div class='laps'>${result.score}</div>
            `;
            resultsNode.appendChild(div);
        }
    },
};

AFRAME.registerSystem('dom-state', {
    init() {
        this.stateUpdateHandler = this.stateUpdate.bind(this);
        this.renderStateHandler = this.renderState.bind(this);
        this.sceneEl.addEventListener('stateupdate', this.stateUpdateHandler);
    },

    remove() {
        this.sceneEl.removeEventListener(
            'stateupdate',
            this.stateUpdateHandler,
        );
    },

    stateUpdate(e) {
        const action = e.detail.action;
        this.renderState(action);
    },

    renderState(action) {
        const state = this.sceneEl.systems.state.state;
        config[action]?.(state[stateMap[action]]);
    },
});
