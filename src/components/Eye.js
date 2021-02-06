import React from 'react'



const Eye = ({x, y, size, eyeWhiteColor, irisColor, pupilColor, opacity}) => {
 
    return ( 
        <g>
            <circle cx={x} cy={y} r={size * (0.9 + Math.random()/100)} fill={eyeWhiteColor} opacity={opacity}/>
            <circle cx={x} cy={y} r={size/1.5 * (0.8 + Math.random()/100)} fill={irisColor} opacity={opacity}/>
            <circle cx={x} cy={y} r={size/5} fill={pupilColor}opacity={opacity}/>


        </g>
     );
}
 
export default Eye;