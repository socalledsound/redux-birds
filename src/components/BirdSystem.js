import React from 'react';
import { connect } from 'react-redux';
import Bird from './Bird';
// import CircleChildren from './CircleChildren';

class BirdSystem extends React.Component {


    render(){
        const { birds } = this.props;
        // console.log(birds);
       
            if(birds[0] !== undefined){
                return (
                    <g>
                        {birds.map(bird => <Bird {...bird} key={bird.id} />)}
                    </g>
                )
            } else {
                return (
                    <div>loading....</div>
                )
            }
        
    }


}


export default connect()(BirdSystem);
