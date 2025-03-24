// Globals
import 'aframe';
import 'aframe-event-set-component';
import 'a-frame-router-templates';
import 'aframe-orbit-controls';
import 'aframe-state-component';
import Alpine from 'alpinejs';
// libs
import './lib/dom-ui';
// State
import './states/index';
// Systems
import './systems/game-manager';
// Components
import './components/car';
import './components/camera-holder';
import './components/a-rounded';
import './components/a-event-emit';
import './components/ui-switcher';
import './components/countdown';
import './components/timer';
import './components/quiz-manager';
import './components/score-manager';
import './components/top-score-manager';
import './components/confetti-effect';
import './components/game-runner';
import './components/a-input';
// Primitives
import './primitives/track';
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
