import React from 'react';
import { connect } from 'react-redux';
import {
    changeEyeColor,
    updateClicked,
} from '../redux/birds.actions';
import Head from './Head';
import Eye from './Eye';
import Beak from './Beak';

class Bird extends React.Component {
    constructor(props){
        super(props)
        this.sound = this.props.howl;
    }
    

    componentDidMount(){
        

    }


    breathe(){

    }

    playSound(){
        // this.sound.play();
    }

    stopGrowing(){
        // this.sound.stop();
        // stopTicker();
    }

    updateClicked(idx){
        const { updateClicked } = this.props
        // this.playSound();
        updateClicked(idx);
        // startTicker();
       
    }


    render(){
        const {id, location, headSize, headColor1, headColor2, opacity, randomLeftEyeVal, randomRightEyeVal, irisColor, changeEyeColor, clicked } = this.props;
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
            return (
                <g className="bird" id={`bird${id}`} style={{position: 'absolute'}}  onMouseDown={() => this.updateClicked(id)} onMouseUp={() => this.updateClicked(id)} onMouseEnter={() => changeEyeColor(id)} onMouseLeave={() => changeEyeColor(id)}>
                <Head x={location.x} y={location.y} headSize={headSize} headColor1={headColor1} headColor2={headColor2} opacity={opacity}/> 
                
                <Eye x={location.x - headSize/3 + randomLeftEyeVal - headSize/8} y={location.y - headSize + headSize/10} size={headSize/3} eyeWhiteColor={'#FFF'} irisColor={irisColor} pupilColor={'#000'} opacity={opacity}/>
                <Eye x={location.x + headSize/3 - randomRightEyeVal + headSize/8} y={location.y - headSize + headSize/10} size={headSize/3} eyeWhiteColor={'#FFF'} irisColor={irisColor} pupilColor={'#000'} opacity={opacity}/>
                <Beak x={location.x} y={location.y - headSize * 0.9} width={headSize/9} height={headSize * 0.7} opacity={opacity}/>
            </g>
            )
        }

    }


}

const mapStateToProps = state => ({
    birds: state.birds,

})


const mapDispatchToProps = dispatch => ({
    changeEyeColor : (id) => dispatch(changeEyeColor(id)),
    updateClicked : (idx) => dispatch(updateClicked(idx)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Bird)

// onClick={() => this.triggerGrowing()} onMouseEnter={() => this.seeRed()} onMouseLeave={() => this.seeRed()}