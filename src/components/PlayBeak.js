import React from 'react';
import { rotate } from '../utils';

const PlayBeak = ({ x, y, width, height, opacity, beakRoll = 0 }) => {

    // "x1, y1, x2, y2, x3, y3 "
    
    
// export const rotate = (cx, cy, x, y, angle) =>  {
//     var radians = (Math.PI / 180) * angle,
//         cos = Math.cos(radians),
//         sin = Math.sin(radians),
//         nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
//         ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
//     return [nx, ny];
//   }
  
    const x1 = x - width;
    const y1 = y;
    const x2 = x + width * 2;
    const y2 = y + height/2;
    const x3 = x - width;
    const y3 = y + height;

    const rotated1 = rotate(x + width/2, y + height/2, x1, y1, beakRoll);
    const rotated2 = rotate(x+ width/2, y + height/2, x2, y2, beakRoll);
    const rotated3 = rotate(x+ width/2, y+ height/2, x3, y3, beakRoll);


    
    const points = `${rotated1.x},${rotated1.y} ${rotated2.x},${rotated2.y}, ${rotated3.x},${rotated3.y}`


    return ( 

        <polygon points={points} fill="yellow" stroke="pink" opacity='1.0'/>
     );
}
 
export default PlayBeak;