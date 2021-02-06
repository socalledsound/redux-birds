import React from 'react'



const Eye = ({x, y, size, eyeWhiteColor, irisColor, pupilColor, opacity}) => {
 
    return ( 
        <g>
            <circle cx={x} cy={y} r={size * (0.9 + Math.random()/10)} fill={eyeWhiteColor} opacity={opacity}/>
            <circle cx={x} cy={y} r={size/1.5} fill={irisColor}opacity={opacity}/>
            <circle cx={x} cy={y} r={size/5} fill={pupilColor}opacity={opacity}/>


        </g>
     );
}
 
export default Eye;