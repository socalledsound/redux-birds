import { mySimpleTween, tweenToDestination } from '../utils.js';
import  GlobalSettings from '../GlobalSettings';

class BirdData {
    constructor(baseBirdData, svgWidth, svgHeight){
        const {id, randomXScaler, randomYScaler, randomHeadSizeScaler, color1, color2, color3} = baseBirdData;
        // console.log(color3);
        // console.log(randomHeadSizeScaler, svgHeight, GlobalSettings.minHeadSize);
        this.id = id;
        // this.howl = GlobalSettings.sounds[id % GlobalSettings.numSounds];
        this.baseHeadSize = randomHeadSizeScaler * svgHeight/GlobalSettings.constructorHeightScaler + svgWidth/GlobalSettings.constructorWidthScaler;
        this.clickedHeadSize = this.baseHeadSize + 10;
        this.startHeadSize = 5;
        this.headSize = this.baseHeadSize;
        this.smallHeadSize = GlobalSettings.minHeadSize;
        this.largeHeadSize = GlobalSettings.minHeadSize * 6;
        this.startLocation = { x: (this.clickedHeadSize * 2.0) + (randomXScaler * (svgWidth - this.clickedHeadSize * 4.0)), y: (this.clickedHeadSize * 2.0) + (randomYScaler * (svgHeight - this.clickedHeadSize * 4.0))  };
        this.location = this.startLocation;
        this.currentScreenCenter = {x: svgWidth/2, y: svgHeight/2};
        this.velocity = { x: Math.random() * 2.0, y: Math.random() * 2.0 };
        this.acceleration = {x: 0, y: 0};
        this.flutterFriction = 0.92;
        this.dragFriction = 0.8;
        this.toCenter = tweenToDestination(this.location, this.currentScreenCenter, GlobalSettings.toCenterResolution);
        this.toEdge = tweenToDestination(this.currentScreenCenter, GlobalSettings.edge, GlobalSettings.toCenterResolution);
        this.toBig = mySimpleTween(this.clickedHeadSize, GlobalSettings.maxHeadSize, GlobalSettings.growResolution);
        this.toSmall = mySimpleTween(GlobalSettings.maxHeadSize, GlobalSettings.minHeadSize, GlobalSettings.shrinkResolution);
        this.startTween = mySimpleTween(this.startHeadSize, this.baseHeadSize, GlobalSettings.startGrowResolution);
        this.headColor1 = color1;
        this.headColor2 = color2;
        // this.mainIrisColor = `#${color3}`;
        this.mainIrisColor = color3;
        this.redIrisColor = '#FF0000';
        this.irisColor = this.mainIrisColor;
        this.randomLeftEyeVal = 0;
        this.randomRightEyeVal = 0;
        this.coinVal = 0.9999;
        this.slowCoinVal  = 0.999;
        this.fastCoinVal  = 0.99;
        this.eyeMoveVal = Math.random() * 3 + 2;
        this.breatheRate = Math.random()/10;
        this.eyeRollOffset = {x: 0, y: 0};
        this.theta = 0;
        this.opacity = 0.1;
        this.beingPlayedCount = 0;
        this.showing= false;
        this.eyeToggle  = false;
        this.breathe = true;
        this.front  = false;
        this.growing  = false;
        this.clicked = false;
        this.beingPlayed = false;
        this.hovered = false;
        this.soundPlaying = false;
        this.triggerSound = false;

        // console.log(this.irisColor);

    }

}

export default BirdData
