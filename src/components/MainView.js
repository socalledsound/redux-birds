import React, { Component } from 'react'
import BirdSystem from './BirdSystem';
// import Box1 from './Box1';


const mainViewStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    
}


class MainView extends Component {
    constructor(props){
        super(props)
        this.svgRef = React.createRef();
    }
    
    componentDidMount() {
        const { resetClicked, updateMousePos } = this.props;
        this.svgRef.current.addEventListener("touchstart", (e) => {
            e.preventDefault();
           // this.props.updateMousePos(e.clientX, e.clientY);
           // this.props.startDrawing();
        });

        this.svgRef.current.addEventListener("touchmove", (e) => {
            e.preventDefault();

            updateMousePos(e.touches[0].pageX, e.touches[0].pageY)
        });

        this.svgRef.current.addEventListener("touchend", (e) => {
            e.preventDefault();
            resetClicked();
         });
    }


    render() {
        const { svgWidth, svgHeight, birds, updateMousePos } = this.props;
        return (
            <div
                onMouseMove={(e) => updateMousePos(e.clientX, e.clientY)}
                onMouseUp={() => this.props.resetClicked()}
                style={{ overflow: "hidden" }}
                ref={this.svgRef}
            >
                
                <svg
                    style={{...mainViewStyle, width: svgWidth, height: svgHeight }}
                    
                >
                    {/* <Box1 box1coords={}/> */}
                    <BirdSystem birds={birds} />
                </svg>
               
            </div>
        );
    }

}
 
export default MainView;