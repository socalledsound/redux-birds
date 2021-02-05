import { mySimpleTween, tweenToDestination } from '../utils.js';
import  GlobalSettings from '../GlobalSettings';

class BirdData {
    constructor(baseBirdData, svgWidth, svgHeight){
        const {id, randomXScaler, randomYScaler, randomHeadSizeScaler, color1, color2, color3} = baseBirdData;
        console.log(randomHeadSizeScaler, svgHeight, GlobalSettings.minHeadSize);
        this.id = id;
        // this.howl = GlobalSettings.sounds[id % GlobalSettings.numSounds];
        this.baseHeadSize = randomHeadSizeScaler * svgHeight/10 + GlobalSettings.minHeadSize;
        this.clickedHeadSize = this.baseHeadSize + 10;
        this.startHeadSize = this.baseHeadSize;
        this.headSize = this.baseHeadSize;
        this.smallHeadSize = GlobalSettings.minHeadSize;
        this.largeHeadSize = GlobalSettings.minHeadSize * 6;
        this.startLocation = { x: this.clickedHeadSize + (randomXScaler * (svgWidth - this.clickedHeadSize * 2.0)), y: this.clickedHeadSize + (randomYScaler * (svgHeight - this.clickedHeadSize * 2.0))  };
        this.location = this.startLocation;
        this.currentScreenCenter = {x: svgWidth/2, y: svgHeight/2};
        this.toCenter = tweenToDestination(this.location, this.currentScreenCenter, GlobalSettings.toCenterResolution);
        this.toEdge = tweenToDestination(this.currentScreenCenter, GlobalSettings.edge, GlobalSettings.toCenterResolution);
        this.toBig = mySimpleTween(this.clickedHeadSize, GlobalSettings.maxHeadSize, GlobalSettings.growResolution);
        this.toSmall = mySimpleTween(GlobalSettings.maxHeadSize, GlobalSettings.minHeadSize, GlobalSettings.shrinkResolution);
        this.headColor1 = color1;
        this.headColor2 = color2;
        this.mainIrisColor = color3;
        this.redIrisColor = '#FF0000';
        this.irisColor = this.mainIrisColor;
        this.randomLeftEyeVal = 0;
        this.randomRightEyeVal = 0;
        this.coinVal = 0.9999;
        this.originalCoinVal  = 0.9999;
        this.fastCoinVal  = 0.995;
        this.breatheRate = Math.random()/10;
        this.eyeRollOffset = {x: 0, y: 0};
        this.theta = 0;
        this.opacity = 0.0;
        this.eyeToggle  = false;
        this.breathe = true;
        this.front  = false;
        this.growing  = false;
        this.clicked = false;
        this.soundPlaying = false;



    }

}

export default BirdData
