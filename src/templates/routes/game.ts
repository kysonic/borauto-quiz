import { Font } from '../../config';

AFRAME.registerTemplate(
    'game',
    /*html*/ ` 
    <a-assets>
        <a-asset-item
            id="carModel"
            src="/assets/models/cars/simple.glb"
        ></a-asset-item>
        <img id="tachometer-img" src="/assets/img/tachometer.png" />
        <img id="arrow-img" src="/assets/img/arrow.png" />
        <img id="nos" src="/assets/img/nos.svg" />
        <img id="nos-active" src="/assets/img/nos-active.svg" />
    </a-assets>
<!-- Manager -->
<a-entity game-runner timer></a-entity>
<!-- Car -->
<a-entity id="car" gltf-model="#carModel" car scale="0.1 0.1 0.1"></a-entity>
<!-- Sounds -->
<a-sound
      id="idle-sound-e"
      src="#idle-sound"
      positional="false"
      volume="1.1"
      loop="true"
  ></a-sound>
  <a-sound
      id="start-sound-e"
      src="#start-sound"
      positional="false"
      volume="0.9"
  ></a-sound>
  <a-sound
      id="gearbox-sound-e"
      src="#gearbox-sound"
      positional="false"
      volume="0.8"
  ></a-sound>
  <a-sound
      id="gas-start-e"
      src="#gas-start-sound"
      positional="false"
      volume="1.5"
  ></a-sound>
  <a-sound
      id="gas-top-e"
      src="#gas-top-sound"
      positional="false"
      volume="2"
      loop="true"
  ></a-sound>
  <a-sound
      id="countdown-sound-e"
      src="#countdown-sound"
      positional="false"
      volume="0.4"
  ></a-sound>
  <!--a-sound
    id="gas-top-idle-sound-e"
    src="#gas-top-idle-sound"
    positional="false"
    volume="0.05"
    loop="true"
  ></!--a-sound-->
  <a-sound
      id="gas-gear-e"
      src="#gas-gear-sound"
      positional="false"
      volume="1.1"
  ></a-sound>
  <a-sound
      id="nitro-sound-e"
      src="#nitro-sound"
      positional="false"
      volume="0.7"
  ></a-sound>
  <a-sound
      id="confetti-sound-e"
      src="#confetti-sound"
      positional="false"
      volume="0.8"
  ></a-sound>
<!-- Confetti -->
<a-entity id="confetti"></a-entity>
<!-- UI -->
<a-entity
    ui-switcher="ui: game"
    position="0.02719 0.49 -1.48"
    rotation="-99 0 180"
>
    <a-rounded
        position="-0.5 0 0"
        opacity="0.5"
        color="#000"
        width="1"
        height="0.3"
        radius="0.1"
    ></a-rounded>
    <!-- tachometer -->
    <a-image
        position="0.3 0.15 0.02"
        width="0.2"
        height="0.2"
        rotation="0 0 0"
        src="#tachometer-img"
    ></a-image>
    <a-image
        id="arrow-vr"
        bind__rotation="vrRpm"
        position="0.3 0.15 0.025"
        width="0.013"
        height="0.136"
        rotation="0 0 0"
        src="#arrow-img"
    ></a-image>
    <a-text
        id="speed-number-vr"
        position="0.36 0.12 0.03"
        rotation="0 0 0"
        align="center"
        font="${Font}"
        value="0 kmh"
        bind__value="speed"
        width="0.5"
        color="#FFF"
    ></a-text>
    <a-text
        id="gear-number-vr"
        position="0.36 0.09 0.03"
        rotation="0 0 0"
        align="center"
        font="${Font}"
        value="1"
        bind__value="gear"
        width="0.5"
        color="#FFF"
    ></a-text>
    <!-- info -->
    <a-text
        id="timer-number-vr"
        position="-0.31 0.22 0.03"
        rotation="0 0 0"
        align="center"
        font="${Font}"
        value="00:30:00"
        bind__value="formattedTime"
        width="1"
        color="#FFF"
    ></a-text>
    <a-text
        position="-0.31 0.16 0.03"
        rotation="0 0 0"
        align="center"
        font="${Font}"
        value="КРУГОВ ПРОИДЕНО:"
        width="0.5"
        color="#FFF"
    ></a-text>
    <a-text
        id="laps-number-vr"
        position="-0.31 0.09 0.03"
        rotation="0 0 0"
        align="center"
        font="${Font}"
        bind__value="laps"
        width="2"
        color="#FFF"
    ></a-text>
    <a-text
        position="0 0.12 0.03"
        rotation="0 0 0"
        align="center"
        font="${Font}"
        value="NOS"
        width="1"
        color="#FFF"
    ></a-text>
    <a-entity id="nos-list"></a-entity>
</a-entity>

    <!-- Countdown Traffic Light -->
    <a-entity countdown>
      <a-rounded
          position="-0.15 0.8 -0.6"
          opacity="0.2"
          color="#000"
          width="0.3"
          height="0.5"
          radius="0.1"
      ></a-rounded>
      <a-rounded
          position="-0.1 1.06 -0.61"
          opacity="0.9"
          color="red"
          width="0.2"
          height="0.2"
          radius="0.09"
      ></a-rounded>
      <a-rounded
          id="countdown-go-circle-vr"
          position="-0.1 0.83 -0.61"
          opacity="0.9"
          color="#ccc"
          width="0.2"
          height="0.2"
          radius="0.09"
      ></a-rounded>
      <a-text
          id="countdown-number-vr"
          position="0.005 1.16 -0.62"
          rotation="0 180 0"
          align="center"
          font="${Font}"
          value="4"
          width="2"
          color="#FFF"
      ></a-text>
      <a-text
          id="countdown-go-vr"
          position="0 0.93 -0.62"
          rotation="0 180 0"
          align="center"
          font="${Font}"
          value=""
          width="2"
          color="#FFF"
      ></a-text>
  </a-entity>
  `,
);
