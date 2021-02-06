import React from 'react';
import { connect } from 'react-redux';

import {
    resizeScreen,
    updateBuffers,
    checkForOverlaps,
    addBaseBird,
    addBird,
    // checkNeighbors,
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
    addBirds,
    addBaseBirds,
    hatchBirds,
} from './redux/birds.actions';

import MainView from './components/MainView';
import GlobalSettings from './GlobalSettings';
import { makeBaseBird, makeBird, getDistance, checkNeighbors } from './utils';
import { audioContext, soundFilesArray, initBuffer, reverseBuffers } from './sound-utils';



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
            const { timeTick, dragActive, rollEyes, moveEyes, activeID, mousePos, mouseRef } = this.props;
            // const { hatchCount } = this.state
           //console.log(tickerStarted, timeTick, 'in start ticker')
            
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



                if(timeTick > 100){
                    breatheAll();
                    moveEyes();
                    
                }

                // console.log(dragActive, activeID);
                // console.log(birds[activeID]);
                if(dragActive && activeID !== null){
                        // console.log(mousePos);
                        // console.log(mouseRef);
                        const eyeOffsetX = mousePos.x - mouseRef.x;
                        const eyeOffsetY = mousePos.y - mouseRef.y;
                        
                        rollEyes(activeID, eyeOffsetX, eyeOffsetY);
                        let dist = getDistance(this.lastMousePos, mousePos);
                        //console.log(dist);
                        if(dist > GlobalSettings.scrubSensitivity){
                            this.lastMousePos = mousePos
                            this.playSound(activeID, mousePos.x-mouseRef.x, mousePos.y-mouseRef.y)
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
            if(!checkNeighbors(bird, this.buildBirdsArray)){
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
        console.log(buf.duration);

        const scrubValue = (Math.abs(eyeOffsetX)/500)%buf.duration;
        const changedRate = 1.0 - Math.abs(eyeOffsetY)/100;
       // const 

        //const scrubValue = absOffset > (buf.duration - 0.1) ? (buf.duration - 0.1) : absOffset;
        

        
        
        if(this.state.isPlaying){
            this.source.stop(0);
            this.setState({isPlaying: false});
        }
        
       this.source = audioContext.createBufferSource();
        // if( source ) { source.stop(0); }
        this.source.buffer = buf
        this.source.connect(audioContext.destination);
        const offset = scrubValue * buf.duration;
        this.source.playbackRate.value = changedRate * 100/birds[idx].headSize;
        this.source.start(0, offset, 0.25);
        this.setState({isPlaying: true});
    }




    updateMousePos = (x, y) => {
        const { updateMousePos } = this.props;
        updateMousePos(x,y);

    }

    resetClicked = (x,y) => {
        const { resetClicked } = this.props
        resetClicked();
        this.setState({isPlaying: false});
    }


    render(){
        const { svgWidth, svgHeight, birds } = this.props;
       // console.log(birds);
       //console.log(buffers);
        //console.log(svgHeight);
        return (
            <React.Fragment>
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
    currentIDX : state.currentIDX,
    dragActive : state.dragActive,
    activeID : state.activeID,
    mousePos: state.mousePos,
    mouseRef: state.mouseRef,
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
    // checkNeighbors : () => dispatch(checkNeighbors()),
    incrementIDX : () => dispatch(incrementIDX()),
    removeBird : (idx) => dispatch(removeBird(idx)),
    fixBird : () => dispatch(fixBird()),
    updateMousePos : (x, y) => dispatch(updateMousePos(x,y)),
    rollEyes : (id, offsetX, offsetY) => dispatch(rollEyes(id, offsetX, offsetY)),
    moveEyes : () => dispatch(moveEyes()),
    resetClicked : () => dispatch(resetClicked()),
    addBirds : (arr) => dispatch(addBirds(arr)),
    addBaseBirds : (arr) => dispatch(addBaseBirds(arr)),
    hatchBirds : (idx) => dispatch(hatchBirds(idx)),
})



export default connect(mapStateToProps, mapDispatchToProps)(App)