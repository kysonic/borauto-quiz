import { Font } from '../../config';

AFRAME.registerTemplate(
    'game',
    /*html*/ ` 
    <a-assets>
        <img id="tachometer-img" src="/assets/img/tachometer.png">
        <img id="arrow-img" src="/assets/img/arrow.png">
    </a-assets>
    <!-- Car -->
    <a-entity  gltf-model="#car" car scale="0.1 0.1 0.1"></a-entity>
    <!-- Timer -->
    <a-entity timer></a-entity>
    <!-- UI -->
    <a-entity
        ui-switcher="ui: game"
        position="0.02719 0.49 -1.48"
        rotation="-99 0 180"
    >
        <a-rounded position="-0.5 0 0" opacity="0.5" color="#000" width="1" height="0.3" radius="0.1"></a-rounded>
        <!-- tachometer -->
        <a-image position="0.3 0.15 0.02" width="0.2" height="0.2" rotation="0 0 0" src="#tachometer-img"></a-image>      
        <a-image id="arrow-vr" bind__rotation="vrRpm" position="0.3 0.15 0.025" width="0.013" height="0.136" rotation="0 0 0" src="#arrow-img"></a-image>    
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
            material="color: #FFF;"
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
            material="color: #FFF;"
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
            material="color: #FFF;"
        ></a-text>  
        <a-text
            position="-0.31 0.16 0.03"
            rotation="0 0 0"
            align="center"
            font="${Font}"
            value="КРУГОВ ПРОИДЕНО:"
            width="0.5"
            color="#FFF"
            material="color: #FFF;"
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
            material="color: #FFF;"
        ></a-text>
    </a-entity>
    <a-entity countdown>
        <a-rounded position="-0.15 0.8 -0.6" opacity="0.2" color="#000" width="0.3" height="0.5" radius="0.1"></a-rounded>
        <a-rounded position="-0.1 1.06 -0.61" opacity="0.9" color="red" width="0.2" height="0.2" radius="0.09"></a-rounded>
        <a-rounded id="countdown-go-circle-vr" position="-0.1 0.83 -0.61" opacity="0.9" color="#ccc" width="0.2" height="0.2" radius="0.09"></a-rounded>
        <a-text
            id="countdown-number-vr"
            position="0.005 1.16 -0.62"
            rotation="0 180 0"
            align="center"
            font="${Font}"
            value="4"
            width="2"
            color="#FFF"
            material="color: #FFF;"
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
            material="color: #FFF;"
        ></a-text> 
    </a-entity>
  `,
);
