import React from 'react'



const Eye = ({x, y, size, eyeWhiteColor, irisColor, pupilColor, opacity}) => {
 
    return ( 
        <g>
            <circle cx={x} cy={y} r={size * (0.9 + Math.random()/100)} fill={eyeWhiteColor} opacity='1'/>
            <circle cx={x} cy={y} r={size/1.5 * (0.8 + Math.random()/100)} fill={irisColor} opacity='1'/>
            <circle cx={x} cy={y} r={size/5} fill={pupilColor}opacity='1'/>


        </g>
     );
}
 
export default Eye;