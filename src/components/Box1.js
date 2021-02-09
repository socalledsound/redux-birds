import React from 'react';


const Box1 = ({ box1coords }) => {

    // "x1, y1, x2, y2, x3, y3 "

    const {
        topx1, topy1, topx2, topx2, 
        rightx1, righty1, rightx2, righty2,
        leftx1, lefty1, leftx2, lefty2,
        bottomx1, bottomy1, bottomx2, bottomy2
    } = box1coords;

    return ( 
        <g>
            <line x1={topx1} y1={topy1} x2={topx2} y2={topx2} stroke="#FF0000" stroke-dasharray="2" />
            <line x1={rightx1} y1={righty1} x2={rightx2} y2={righty2} stroke="#FF0000" stroke-dasharray="2" />
            <line x1={leftx1} y1={lefty1} x2={leftx2} y2={leftx2} stroke="#FF0000" stroke-dasharray="2" />
            <line x1={bottomx1} y1={bottomy1} x2={bottomx2} y2={bottomy2} stroke="#FF0000" stroke-dasharray="2" />

       </g>
     );
}
 
export default Beak;