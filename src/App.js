import React from 'react';
import { connect } from 'react-redux';

import {
    resizeScreen,
    checkForOverlaps,
    addBaseBird,
    addBird,
    checkNeighbors,
    incrementIDX,
    removeBird,
    fixBird,
    startTicker,
    tickTime,
    breatheAll,
    updateMousePos,
    rollEyes,
    resetClicked,
} from './redux/birds.actions';

import MainView from './components/MainView';
import GlobalSettings from './GlobalSettings';
import { makeBaseBird, makeBird } from './utils';



class App extends React.Component {
    
    constructor(props){
        super(props);
        this.startTicker();
        setTimeout(() => this.addBird(), 100);
    }




    componentDidMount(){
        
        this.onResize();    
        window.addEventListener("resize", this.onResize);
        
        
    }

    startTicker = () => {
        const { startTicker, tickTime, breatheAll, tickerStarted } = this.props;

        

        const ticker = () => {
            const { timeTick, dragActive, rollEyes, activeID, mousePos, mouseRef } = this.props;
           //console.log(tickerStarted, timeTick, 'in start ticker')

                tickTime();
                // incrementCircleSize();
                // checkNeighbors();
               // addChildCircle(currentIDX);

                if(timeTick > 100){
                    breatheAll();
                }

                if(dragActive && activeID !== null){
                        console.log(mousePos);
                        console.log(mouseRef);
                        const eyeOffset = mousePos.x - mouseRef.x;
                        console.log(eyeOffset);
                        rollEyes(activeID, eyeOffset);
                      

                }
               

                this.requestAnimation = window.requestAnimationFrame(ticker);
            
        }
        
        if(!tickerStarted){
           // console.log('starting ticker');
            startTicker();
            ticker();
        }

        
     }





   addBird = () => {
        const { addBird, addBaseBird, checkNeighbors, currentIDX, svgWidth, svgHeight, birds } = this.props;
        console.log(currentIDX, svgHeight);
        const basebird = makeBaseBird(currentIDX);
        // console.log(basebird);
        addBaseBird(basebird);
        const bird = makeBird(basebird, svgWidth, svgHeight);
        //console.log(bird);
        addBird(bird);
        checkNeighbors();
        
        setTimeout(this.checkBird, 50);   
        const randomVal = Math.random() * 10000
        if(birds.length < GlobalSettings.numBirds){
            setTimeout(this.addBird, randomVal);
        }
     }

     checkBird = () => {
        const { fixBird, incrementIDX, removeBird, birds, currentIDX } = this.props;
        
        const thisBird = birds.filter(bird => bird.id === currentIDX)[0];
        console.log(thisBird);
        if(thisBird!== undefined && !thisBird.overlap){
            //console.log(thisBird.overlap);
            fixBird();
            incrementIDX();    
        } else {
            removeBird(currentIDX);
        }
     }



    onResize = () => {
            // console.log(window.innerWidth);
            const { resizeScreen } = this.props;
                resizeScreen(window.innerWidth, window.innerHeight);
                //checkForOverlaps();    
                    
    }


    updateMousePos = (x, y) => {
        const { updateMousePos } = this.props;
        updateMousePos(x,y);

    }

    resetClicked = (x,y) => {
        const { resetClicked } = this.props
        resetClicked();
    }


    render(){
        const { svgWidth, svgHeight, birds } = this.props;
        //console.log(svgHeight);
        return (
            <MainView 
                svgWidth={svgWidth} 
                svgHeight={svgHeight} 
                birds={birds}
                updateMousePos={this.updateMousePos}
                resetClicked={this.resetClicked}
            />
        )
    }
   


}

const mapStateToProps = state => ({
    svgWidth: state.svgWidth,
    svgHeight: state.svgHeight,
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
    startTicker : () => dispatch(startTicker()),
    tickTime : () => dispatch(tickTime()),
    breatheAll : () => dispatch(breatheAll()),
    checkForOverlaps : () => dispatch(checkForOverlaps()),
    addBaseBird : (basebird) => dispatch(addBaseBird(basebird)),
    addBird : (bird) => dispatch(addBird(bird)),
    checkNeighbors : () => dispatch(checkNeighbors()),
    incrementIDX : () => dispatch(incrementIDX()),
    removeBird : (idx) => dispatch(removeBird(idx)),
    fixBird : () => dispatch(fixBird()),
    updateMousePos : (x, y) => dispatch(updateMousePos(x,y)),
    rollEyes : (id, offset) => dispatch(rollEyes(id, offset)),
    resetClicked : () => dispatch(resetClicked()),
})



export default connect(mapStateToProps, mapDispatchToProps)(App)