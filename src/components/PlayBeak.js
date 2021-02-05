import React from 'react'
const PlayBeak = ({ x, y, width, height, opacity }) => {

    // "x1, y1, x2, y2, x3, y3 "
    const points = `${x - width},${y} ${x + width * 2},${y + height/2}, ${x-width},${y+height}`


    return ( 

        <polygon points={points} fill="yellow" stroke="pink" opacity={opacity}/>
     );
}
 
export default PlayBeak;