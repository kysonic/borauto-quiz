AFRAME.registerTemplate(
    'preload',
    /*html*/ ` 
  <!-- Assets --> 
  <a-sub-assets>
    <audio
        id="main-theme"
        src="/assets/sounds/main-theme.mp3"
        preload
    ></audio>
    <audio
        id="click"
        src="/assets/sounds/click.wav"
        preload
    ></audio>
    <audio
        id="idle-sound"
        src="/assets/sounds/idle.mp3"
        preload
    ></audio>
    <audio
        id="start-sound"
        src="/assets/sounds/start.mp3"
        preload
    ></audio>
    <audio
        id="gearbox-sound"
        src="/assets/sounds/gearbox.mp3"
        preload
    ></audio>
    <audio
        id="gas-start-sound"
        src="/assets/sounds/gas-start.mp3"
        preload
    ></audio>
    <audio
        id="gas-top-sound"
        src="/assets/sounds/gas-top.mp3"
        preload
    ></audio>
    <!--audio
        id="gas-top-idle-sound"
        src="/assets/sounds/gas-top-idle.mp3"
        preload
    ></!--audio-->
    <audio
        id="gas-gear-sound"
        src="/assets/sounds/gas-gear.mp3"
        preload
    ></audio>
    <audio
        id="nitro-sound"
        src="/assets/sounds/nitro.mp3"
        preload
    ></audio>
    <audio
        id="confetti-sound"
        src="/assets/sounds/confetti.mp3"
        preload
    ></audio>
    <audio
        id="countdown-sound"
        src="/assets/sounds/countdown.mp3"
        preload
    ></audio>
    <audio
        id="yeap-sound"
        src="/assets/sounds/yeap.mp3"
        preload
    ></audio>
    <audio
        id="nope-sound"
        src="/assets/sounds/nope.mp3"
        preload
    ></audio>
    <img id="controls-img" src="/assets/img/controls-vr.png" preload />
        <a-asset-item
        id="carModel"
        src="/assets/models/cars/simple.glb"
        preload
    ></a-asset-item>
    <img id="tachometer-img" src="/assets/img/tachometer.png" preload />
    <img id="arrow-img" src="/assets/img/arrow.png" preload />
    <img id="nos" src="/assets/img/nos.svg" preload />
    <img id="nos-active" src="/assets/img/nos-active.svg" preload />
    <img id="logo-img" src="/assets/img/b-logo-w.png" preload>
    <img id="quiz-img" src="/assets/img/quiz.png" preload>
  </a-sub-assets>
  `,
);
