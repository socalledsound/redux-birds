import React from 'react';
import { connect } from 'react-redux';
import {
    changeEyeColor,
    updateClicked,
} from '../redux/birds.actions';
import Head from './Head';
import Eye from './Eye';
import Beak from './Beak';
import PlayBeak from './PlayBeak';
// import { audioContext } from '../sound-utils';
// import GlobalSettings from '../GlobalSettings';

class Bird extends React.Component {
    constructor(props){
        super(props)
        this.sound = this.props.howl;
        
    }
    

    componentDidMount(){
        

    }

    calculateLeftEyePos(location, headSize, randomLeftEyeVal, eyeRollOffset){
        console.log(location, headSize, randomLeftEyeVal, eyeRollOffset.x);
        // const startX = location.x - headSize/3 + randomLeftEyeVal - headSize/8;
        // const startY = location.y - headSize + headSize/10;

        

        const rolledX = (location.x + Math.sin(eyeRollOffset.x/100 ) * (headSize * (0.9 - Math.abs(eyeRollOffset.y)/100)));
       
        const rolledY = (location.y + Math.cos(eyeRollOffset.x/100) * (headSize * (0.9 - Math.abs(eyeRollOffset.y)/100)));
        console.log(eyeRollOffset, rolledX, rolledY);
        return {
            x: rolledX,
            y: rolledY
    }

    }

    calculateRightEyePos(location, headSize, randomRightEyeVal, eyeRollOffset){
        console.log(eyeRollOffset);
        // const startX = location.x + headSize/3 - randomRightEyeVal + headSize/8;
        // const startY = location.y - headSize + headSize/10;

        const rolledX = (location.x  + Math.sin(3.14 + eyeRollOffset.x/100 ) * (headSize * (0.9 - Math.abs(eyeRollOffset.y)/100)));
        const rolledY = (location.y + Math.cos(3.14 + eyeRollOffset.x/100) * (headSize * (0.9 - Math.abs(eyeRollOffset.y)/100)));

        return {
            x: rolledX,
            y: rolledY
    }

    }
    dragStart(){
        console.log('dragging');
    }



    stopGrowing(){
        // this.sound.stop();
        // stopTicker();
    }

    updateClicked(idx){
        const { updateClicked } = this.props
        // this.playSound(idx);
        updateClicked(idx);
        // startTicker();
       
    }

    render(){
        const {id, location, headSize, headColor1, headColor2, opacity, randomLeftEyeVal, randomRightEyeVal, irisColor, changeEyeColor, clicked, eyeRollOffset } = this.props;
        console.log(randomLeftEyeVal);
        if(!clicked){
            return (
                <g className="bird" id={`bird${id}`} style={{position: 'absolute'}}  onMouseDown={() => this.updateClicked(id)} onMouseUp={() => this.updateClicked(id)} onMouseEnter={() => changeEyeColor(id)} onMouseLeave={() => changeEyeColor(id)}>
                <Head x={location.x} y={location.y} headSize={headSize} headColor1={headColor1} headColor2={headColor2} opacity={opacity}/> 
                
                <Eye x={location.x - headSize/3 + randomLeftEyeVal} y={location.y - headSize/9} size={headSize/3} eyeWhiteColor={'#FFF'} irisColor={irisColor} pupilColor={'#000'} opacity={opacity}/>
                <Eye x={location.x + headSize/3 - randomRightEyeVal} y={location.y - headSize/9} size={headSize/3} eyeWhiteColor={'#FFF'} irisColor={irisColor} pupilColor={'#000'} opacity={opacity}/>
                <Beak x={location.x} y={location.y + headSize/4} width={headSize/9} height={headSize/3} opacity={opacity}/>
            </g>
            )
        } else {
            const leftEyePos = this.calculateLeftEyePos(location, headSize, randomLeftEyeVal, eyeRollOffset);
            const rightEyePos = this.calculateRightEyePos(location, headSize, randomLeftEyeVal, eyeRollOffset);
            return (
                
                    <g className="bird" id={`bird${id}`} style={{position: 'absolute'}}  onMouseDown={() => this.updateClicked(id)} onMouseUp={() => this.updateClicked(id)} onMouseEnter={() => changeEyeColor(id)} onMouseLeave={() => changeEyeColor(id)}>
                    <Head x={location.x} y={location.y} headSize={headSize} headColor1={headColor1} headColor2={headColor2} opacity={opacity}/> 
                    
                    <Eye x={leftEyePos.x} y={leftEyePos.y} size={headSize/3} eyeWhiteColor={'#FFF'} irisColor={irisColor} pupilColor={'#000'} opacity={opacity}/>
                    <Eye x={rightEyePos.x} y={rightEyePos.y} size={headSize/3} eyeWhiteColor={'#FFF'} irisColor={irisColor} pupilColor={'#000'} opacity={opacity}/>
                    <PlayBeak x={location.x} y={location.y - headSize * 0.35} width={headSize/6} height={headSize * 0.7} opacity={opacity}/>
                    </g>
                   
           
            )
        }

    }


}

const mapStateToProps = state => ({
    birds: state.birds,
    buffers: state.buffers,

})


const mapDispatchToProps = dispatch => ({
    changeEyeColor : (id) => dispatch(changeEyeColor(id)),
    updateClicked : (idx) => dispatch(updateClicked(idx)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Bird)

// onClick={() => this.triggerGrowing()} onMouseEnter={() => this.seeRed()} onMouseLeave={() => this.seeRed()}