import React from 'react';
import { connect } from 'react-redux';
import BG from './components/BG/BG';
import {
    resizeScreen,
    updateBuffers,
    checkForOverlaps,
    addBaseBird,
    addBird,
    checkNeighborBirds,
    incrementIDX,
    removeBird,
    fixBird,
    startTicker,
    tickTime,
    breatheAll,
    updateMousePos,
    rollEyes,
    moveEyes,
    resetClicked,
    resetGrowing,
    addBirds,
    addBaseBirds,
    hatchBirds,
    startRoutine,
    runRoutine,
    toggleRoutinePlaying,
    playNotNow,
    playBird,
    resetBirdWithTimeout,
    moveBirds,
    checkEdges,
    resetTriggerSound,
    growBird,
    flutterBirds,
    resetFluttering,
    decrementFlutterCount,
    changeEyeColor,
    triggerBouncing,
    decrementBounceCount, 
    resetBouncing,
    updateDraggingBird,
    checkOffScreen, 
    checkTooSmall,
} from './redux/birds.actions';

import MainView from './components/MainView';
import GlobalSettings from './GlobalSettings';
import { makeBaseBird, makeBird, getDistance, checkNeighbors } from './utils';
import { audioContext, soundFilesArray, initBuffer, reverseBuffers } from './sound-utils';
// import { getPlaybackValues } from './PLAYBACK_ROUTINE';



class App extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isPlaying: false,
            haveBirds: false,
            // hatchCount: 0,
        }
        this.source = null;
        // this.startTicker();
        this.audioContext = audioContext;
        this.lastMousePos = {x : 0, y: 0};
        this.hatchCount = 0;
        this.buffers = [];
        this.reversedBuffers = [];
        this.buildBirdsArray = [];
        this.baseBirdsArray = [];
        this.started = false;
        this.hatchCount = 0;
        // setTimeout(() => this.addBird(), 100);
    }




    componentDidMount(){
        // this.init();
        const { updateBuffers } = this.props;
           
        window.addEventListener("resize", this.onResize);
        this.onResize().then((response, reject) => {
            console.log(response); 
        })
        this.initSoundBuffers().then((buffers) => {
            this.buffers = buffers;
            this.reversedBuffers = reverseBuffers(buffers);
            updateBuffers(buffers)
        });
        if(!this.started){
            this.initBirds(window.innerWidth, window.innerHeight);
                        
        }

        // const birdsReady = new Promise((resolve, reject) => {
        //     if(this.buildBirdsArray === GlobalSettings.numBirds){
        //         resolve();
        //         console.log('triggered');
        //     }
        // }).then(()=>{
        //     this.started = true;
        //     console.log(this.buildBirdsArray);
        //     addBirds(this.buildBirdsArray);
        //     addBaseBirds(this.baseBirdsArray);
        // })
    }



    // init = async () => {
    //     this.initResize = await this.onResize(); 
    // }



    onResize = () => new Promise((resolve, reject) => {
        const { resizeScreen, initResize } = this.props;
        resizeScreen(window.innerWidth, window.innerHeight);
        if(!initResize){
            resolve('hi');
        } else {
            reject('uhoh');
        }
    })                        

    initSoundBuffers = async () => {
       //this.initSoundBuffers().then( (buffers) => console.log(buffers)); 
       return Promise.all(soundFilesArray.map(soundFile => initBuffer(soundFile)));   
    }




    startTicker = () => {
        const { startTicker, tickTime, breatheAll, tickerStarted } = this.props;

        

        const ticker = () => {
            const { timeTick, dragActive, rollEyes, moveEyes, activeID, mousePos, mouseRef,
                    runRoutine, startRoutine, routineStarted, routinePlaying, changeEyeColor,
                    toggleRoutinePlaying, playNow, flutterBirds, fluttering, flutterCount,
                    birds, checkNeighborBirds,growBird,resetFluttering, decrementFlutterCount,
                    moveBirds, checkEdges, resetTriggerSound, triggerBouncing,
                    decrementBounceCount, resetBouncing, updateDraggingBird,
                checkOffScreen, checkTooSmall } = this.props;
            // const { hatchCount } = this.state
         
            
                tickTime();
                // incrementCircleSize();
                // checkNeighbors();
               // addChildCircle(currentIDX);


                // if(this.hatchCount < 100){
                //     if(birds !== undefined){
                //         hatchBirds(this.hatchCount);
                //         this.hatchCount++;
                //     }
                    
                //     // this.setState({hatchCount: hatchCount + 1})
                // }


                // console.log(timeTick);
                if(timeTick > 100){
                    checkOffScreen();
                    checkTooSmall();
                    breatheAll();
                    moveEyes();  
                    moveBirds();
                    checkEdges();
                    const flutter = Math.random() > 0.9 ? true : false;
                    if(flutter && !fluttering){
                        flutterBirds();

                    }
                    if(fluttering && flutterCount > 0){
                        decrementFlutterCount();
                    }
                    if(fluttering && flutterCount === 0){
                        resetFluttering();
                    }




                    // birds.forEach(bird => );


                    birds.forEach( bird => {
                        Math.random() > GlobalSettings.mainGrowProb && growBird(bird.id); 

                        checkNeighborBirds(bird.id);
                    

                        if(bird.triggerSound){
                            this.playBounceSound(bird);
                            triggerBouncing(bird.id);
                            changeEyeColor(bird.id);
                            rollEyes(bird.id, bird.velocity.x * 100, bird.velocity.y * 100);
                            resetTriggerSound(bird.id);
                        }

                        if(bird.bouncing && bird.bounceCount > 0){
                            decrementBounceCount(bird.id);
                            rollEyes(bird.id, bird.velocity.x * 100, bird.velocity.y * 100);
                        }

                        if(bird.bouncing && bird.bounceCount === 0){
                            resetBouncing(bird.id);
                            changeEyeColor(bird.id)
                        }
                    })
                }

                if(routineStarted){
                   
                        if(!routinePlaying && !playNow){
                            runRoutine();
                          
                        }

                        if(playNow){
                            toggleRoutinePlaying();
                            this.playRoutine();
                            
                        }
                       

                        
                        
                        
                    

                }

   
                if(dragActive && activeID !== null){
   
                        const eyeOffsetX = mousePos.x - mouseRef.x;
                        const eyeOffsetY = mousePos.y - mouseRef.y;
                        growBird(activeID);
                        rollEyes(activeID, eyeOffsetX, eyeOffsetY);
                        updateDraggingBird(activeID, mousePos);
                        let dist = getDistance(this.lastMousePos, mousePos);
                     
                        if(dist > GlobalSettings.scrubSensitivity){
                            this.lastMousePos = mousePos
                            this.playSound(activeID, mousePos.x-mouseRef.x, mousePos.y-mouseRef.y);
                        }
                        
                        if(!routineStarted){
                            startRoutine();
                        }

                }
                
               

                this.requestAnimation = window.requestAnimationFrame(ticker);
            
        }
        
        if(!tickerStarted){
           // console.log('starting ticker');
            startTicker();
            ticker();
        }

        
     }

     buildBirds = (width, height) => {
         const { addBirds, addBaseBirds } = this.props;

        let idx = 0;
        while(this.buildBirdsArray.length < GlobalSettings.numBirds) {
            
            const basebird = makeBaseBird(idx);
            const bird = makeBird(basebird, width, height);
            if(!checkNeighbors(bird, this.buildBirdsArray, 50)){
                this.buildBirdsArray.push(bird);
                this.baseBirdsArray.push(basebird);
                idx++;
            };
        }

       
        addBirds(this.buildBirdsArray);
        addBaseBirds(this.baseBirdsArray);
        console.error('started', this.buildBirdsArray);
        this.startTicker();
        // this.hatchAll();


        // if(this.buildBirdsArray.length < GlobalSettings.numBirds){
        //     const num = GlobalSettings.numBirds - this.buildBirdsArray.length;
        //     for(let i = 0; i < num; i ++) {
        //         const basebird = makeBaseBird(this.idx  * (i + 20));
        //         const bird = makeBird(basebird, width, height);
        //         if(!checkNeighbors(bird, this.buildBirdsArray)){
        //             this.buildBirdsArray.push(bird);
        //             this.baseBirdsArray.push(basebird);
        //         };
        //     }
        // }
        // if(this.buildBirdsArray.length < GlobalSettings.numBirds){
        //     this.initBirds(window.innerWidth, window.innerHeight);
        // } else {
        //     this.startTicker();
        //     addBirds(this.buildBirdsArray);
        //     addBaseBirds(this.baseBirdsArray);
        //     console.error('started', this.buildBirdsArray);

        // }


     }


     initBirds = (width, height) => {
        this.buildBirds(width, height);
     }



    //  hatchAll = () => {
    //      const { birds } = this.props;

    //      birds.forEach( bird => {
    //         bird.startTween
    //      })
    //  }


//    addBird = () => {
//         const { addBird, addBaseBird, checkNeighbors, currentIDX, svgWidth, svgHeight, birds } = this.props;
//         //console.log(currentIDX, svgHeight);
//         const basebird = makeBaseBird(currentIDX);
//         // console.log(basebird);
//         addBaseBird(basebird);
//         const bird = makeBird(basebird, svgWidth, svgHeight);
//         //console.log(bird);
//         addBird(bird);
//         checkNeighbors();
        
//         setTimeout(this.checkBird, 50);   
//         const randomVal = Math.random() * GlobalSettings.birdWaitVal;
//         if(GlobalSettings.birdWaitVal > 100){
//             GlobalSettings.birdWaitval -= 250;
//         }
//         if(GlobalSettings.minHeadSize > 10){
//             GlobalSettings.minHeadSize -= 3;
//         }
//         if(birds.length < GlobalSettings.numBirds){
//             setTimeout(this.addBird, randomVal);
//         }
//      }

     checkBird = () => {
        const { fixBird, incrementIDX, removeBird, birds, currentIDX } = this.props;
        
        const thisBird = birds.filter(bird => bird.id === currentIDX)[0];
        //console.log(thisBird);
        if(thisBird!== undefined && !thisBird.overlap){
            //console.log(thisBird.overlap);
            fixBird();
            incrementIDX();    
        } else {
            removeBird(currentIDX);
        }
     }

     playSound(idx, eyeOffsetX, eyeOffsetY){
        const { birds } = this.props;
        const buf = eyeOffsetX < 0 ? this.buffers[idx%GlobalSettings.numSounds] : this.reversedBuffers[idx%GlobalSettings.numSounds];
        console.log('playing sound:', idx);

        const scrubValue = (Math.abs(eyeOffsetX)/500)%buf.duration;
        const changedRate = 1.0 - Math.abs(eyeOffsetY/10)/100;


      
        if(this.state.isPlaying){
            this.source.stop(0);
            this.setState({isPlaying: false});
        }
        
       this.source = audioContext.createBufferSource();

        let rate = changedRate * 100/birds[idx].headSize;
        if(rate > 2.0){
            rate = 3.0;
        } else if(rate < 0.4){
            rate = 0.2;
        }
        this.source.buffer = buf
        this.source.connect(audioContext.destination);
        const offset = scrubValue * buf.duration;
        this.source.playbackRate.value = rate;
        this.source.start(0, offset, 0.25);
        this.setState({isPlaying: true});
    }


    playRoutine = () => {
        const { toggleRoutinePlaying, playBird, resetBird, rollEyes, playNotNow, playBackIndex, playbackValues} = this.props;
        
        playNotNow();
        const pbValues = playbackValues[playBackIndex];
        console.log(pbValues, playbackValues, playBackIndex);
        this.playRoutineSound(pbValues);
        playBird(pbValues.birdNum);
        rollEyes(pbValues.birdNum, pbValues.offset * -1 * pbValues.dir * 100, pbValues.rate * 100);
        resetBird(pbValues.birdNum, pbValues.duration * 2000)
        setTimeout(toggleRoutinePlaying, pbValues.duration * 10000);
    }
    
    playBounceSound = (bird) => {
        console.log(bird);
        const buf = bird.velocity.x < 0 ? this.buffers[bird.id % GlobalSettings.numSounds] : this.reversedBuffers[bird.id % GlobalSettings.numSounds];
        console.log(buf.duration);
        const pbSource = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        pbSource.buffer = buf;
        gainNode.gain.value = 0.5;
        gainNode.connect(audioContext.destination);
        pbSource.connect(gainNode);
       
        let rate = Math.abs(bird.velocity.x)/5.0 + 0.5;
        if(rate > 4.0){
            rate = 4.0;
        } else if(rate < 0.2){
            rate = 0.2;
        }
        pbSource.playbackRate.value = rate;
        const offset = Math.random() * buf.duration;
        pbSource.start(0, offset, 0.1 + Math.random());
    }

    playRoutineSound(pbValues){
        const { birds } = this.props;
        const buf = pbValues.dir < 0 ? this.buffers[pbValues.bufnum] : this.reversedBuffers[pbValues.bufnum];
        
       const pbSource = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        pbSource.buffer = buf;
        gainNode.gain.value = pbValues.vol;
        gainNode.connect(audioContext.destination);
        pbSource.connect(gainNode);
        const offset = pbValues.offset * buf.duration;
        pbSource.playbackRate.value = pbValues.rate/(birds[pbValues.birdNum].headSize/50.0);
        pbSource.start(0, offset, pbValues.playLength);
        // this.setState({isPlaying: true});
    }

    updateMousePos = (x, y) => {
        const { updateMousePos } = this.props;
        updateMousePos(x,y);

    }

    resetClicked = (x,y) => {
        const { resetClicked } = this.props
        resetClicked();
        // resetGrowing();
        this.setState({isPlaying: false});
    }


    render(){
        const { svgWidth, svgHeight, birds, timeTick, activeID } = this.props;
        let xFactor = 0;
        // console.log(birds, birds.length, activeID, svgWidth);
        if(birds && birds.length > 0 && activeID && svgWidth){
            xFactor = birds[activeID].location.x/svgWidth;
        } 
       

        return (
            <React.Fragment>
                <BG u_time={timeTick} xFactor={xFactor}/>
                <MainView 
                svgWidth={svgWidth} 
                svgHeight={svgHeight} 
                birds={birds}
                updateMousePos={this.updateMousePos}
                resetClicked={this.resetClicked}
                
                />
                
            </React.Fragment>
        )
    }



}

const mapStateToProps = state => ({
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
    buffers: state.buffers,
    birds: state.birds,
    tickerStarted: state.tickerStarted, 
    timeTick: state.timeTick,
    routineStarted : state.routineStarted,
    routinePlaying : state.routinePlaying,
    playNow : state.playNow,
    playbackValues : state.playbackValues,
    playBackIndex : state.playBackIndex,
    currentIDX : state.currentIDX,
    dragActive : state.dragActive,
    activeID : state.activeID,
    mousePos: state.mousePos,
    mouseRef: state.mouseRef,
    fluttering: state.fluttering,
    flutterCount : state.flutterCount,
})

const mapDispatchToProps = dispatch => ({
    resizeScreen: (width, height) => dispatch(resizeScreen(width, height)),
    updateBuffers: (buffers) => dispatch(updateBuffers(buffers)),
    startTicker : () => dispatch(startTicker()),
    tickTime : () => dispatch(tickTime()),
    breatheAll : () => dispatch(breatheAll()),
    checkForOverlaps : () => dispatch(checkForOverlaps()),
    addBaseBird : (basebird) => dispatch(addBaseBird(basebird)),
    addBird : (bird) => dispatch(addBird(bird)),
   
    incrementIDX : () => dispatch(incrementIDX()),
    removeBird : (idx) => dispatch(removeBird(idx)),
    fixBird : () => dispatch(fixBird()),
    updateMousePos : (x, y) => dispatch(updateMousePos(x,y)),
    rollEyes : (id, offsetX, offsetY) => dispatch(rollEyes(id, offsetX, offsetY)),
    moveEyes : () => dispatch(moveEyes()),
    
    resetClicked : () => dispatch(resetClicked()),
    resetGrowing : () => dispatch(resetGrowing()),
    addBirds : (arr) => dispatch(addBirds(arr)),
    addBaseBirds : (arr) => dispatch(addBaseBirds(arr)),
    hatchBirds : (idx) => dispatch(hatchBirds(idx)),
    startRoutine : () => dispatch(startRoutine()),
    runRoutine : () => dispatch(runRoutine()),
    toggleRoutinePlaying : () => dispatch(toggleRoutinePlaying()),
    playNotNow : () => dispatch(playNotNow()),
    playBird : (idx) => dispatch(playBird(idx)),
    resetBird : (idx, wait) => resetBirdWithTimeout(dispatch, idx, wait),
    moveBirds : () => dispatch(moveBirds()),
    flutterBirds : () => dispatch(flutterBirds()),
    checkEdges : () => dispatch(checkEdges()),
    checkNeighborBirds : (idx) => dispatch(checkNeighborBirds(idx)),
    resetTriggerSound : (idx) => dispatch(resetTriggerSound(idx)),
    growBird : (idx) => dispatch(growBird(idx)),
    resetFluttering : () => dispatch(resetFluttering()),
    decrementFlutterCount : () => dispatch(decrementFlutterCount()),
    changeEyeColor : (id) => dispatch(changeEyeColor(id)),
    triggerBouncing : (id) => dispatch(triggerBouncing(id)),
    decrementBounceCount : (id) => dispatch(decrementBounceCount(id)),
    resetBouncing : (id) => dispatch(resetBouncing(id)),
    updateDraggingBird : (idx, mousePos) => dispatch(updateDraggingBird(idx, mousePos)),
    checkOffScreen : () => dispatch(checkOffScreen()),
    checkTooSmall : () => dispatch(checkTooSmall()),
})



export default connect(mapStateToProps, mapDispatchToProps)(App)