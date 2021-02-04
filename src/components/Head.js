import React from 'react'
import { getColorGradient } from '../utils';

const Head = ({ x, y, headSize, headColor1, headColor2, opacity } ) =>  {

    const numCircles = 30;
    const gradient = getColorGradient(headColor1, headColor2);
    const colors = Array.from({length: numCircles * 10 }, (__ , i ) => gradient(i/20));
    const circleSizes = Array.from({ length: numCircles }, (_ , i) => {
        let newHeadsize = headSize - i * 6;  
        if(newHeadsize < 0){
            newHeadsize = 0;
        }
        return newHeadsize
    });

        // {/* <defs>
        // <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
        //   <stop offset="0%" style={{ stopColor: 'rgb(255,255,0)', stopOpacity: '1'}} />
        //   <stop offset="100%" style={{ stopColor: 'rgb(255,0,0)', stopOpacity: '1'}} />
        // </linearGradient>
        // </defs> */}



    return ( 
       

            <g>
                {circleSizes.map(
                    (size, i) => 
                            <circle 
                                key={`circle-${headColor1}${i}`} 
                                cx={x} 
                                cy={y} 
                                r={size} 
                                fill={colors[i]} 
                                stroke={headColor1} 
                                strokeWidth="90%" 
                                opacity={opacity}
                                
                    
                            />
                        )}
            </g>
            
            
            );


}
 
export default Head;