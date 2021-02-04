import React, { Component } from 'react'
import BirdSystem from './BirdSystem';


const mainViewStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    background: "#8aeb96"
}


class MainView extends Component {
    constructor(props){
        super(props)
        this.svgRef = React.createRef();
    }
    
    componentDidMount() {

        this.svgRef.current.addEventListener("mousedown", (e) => {
           // this.props.updateMousePos(e.clientX, e.clientY);
           // this.props.startDrawing();
        });

        this.svgRef.current.addEventListener("mouseup", () => {
           // this.props.stopDrawing();
        });
    }


    render() {
        const { svgWidth, svgHeight, birds, updateMousePos } = this.props;
        return (
            <div
                 onMouseMove={(e) => updateMousePos(e.clientX, e.clientY)}
                onMouseUp={() => this.props.resetClicked()}
                style={{ overflow: "hidden" }}
            >
                
                <svg
                    style={{...mainViewStyle, width: svgWidth, height: svgHeight }}
                    ref={this.svgRef}
                >
                    <BirdSystem birds={birds} />
                </svg>
               
            </div>
        );
    }

}
 
export default MainView;