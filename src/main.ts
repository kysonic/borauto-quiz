// Globals
import 'aframe';
import 'aframe-event-set-component';
import 'a-frame-router-templates';
import 'aframe-orbit-controls';
import 'aframe-state-component';
import Alpine from 'alpinejs';
// State
import './states/index';
// Systems
import './systems/game-manager';
import './systems/ui-switcher';
// Components
import './components/common/confetti-effect';
import './components/common/camera-holder';
import './components/a-components/a-rounded';
import './components/a-components/a-event-emit';
import './components/a-components/a-input';
import './components/timers/countdown';
import './components/timers/timer';
import './components/managers/quiz-manager';
import './components/managers/score-manager';
import './components/managers/top-score-manager';
import './components/managers/game-runner';
import './components/game/car';
// Primitives
import './primitives/track/track';
// Routes
import './templates/routes/start';
import './templates/routes/game';
import './templates/routes/quiz';
import './templates/routes/scores';
import './templates/routes/top-scores';
import './templates/routes/controls';
import './templates/routes/how-to-play';
import './templates/routes/loading';
// Templates
import './templates/common/env';
import './templates/common/effects';
import './templates/common/preload';

// Alpine
window.Alpine = Alpine;
window.addEventListener('DOMContentLoaded', () => {
    window.Alpine.start();
});
