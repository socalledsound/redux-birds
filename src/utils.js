import chroma from 'chroma-js'
import BirdBaseValues from './redux/BirdBaseValues';
import BirdData from './redux/BirdData';

export const getRandomColor = () => {
    // return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    // return `#${(Math.random()*0xFFFFFF<<0).toString(16)}`
    return Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, "0")
}

export const getRandomPurple = () => {
  return chroma.mix('red', 'blue', Math.random(), 'rgb');
}

export const mySimpleTween = (start, dest, steps) => Array.from({ length: steps }, (_, i) => (start + (dest/steps * i)) );


export const tweenToDestination = (start, destination, steps) => {
  // console.log(start, destination);
  const arr = Array.from({ length: steps }, (_, i) => {
    const xDist = destination.x - start.x;
    const xEach = xDist/steps;
    const yDist = destination.y - start.y;
    const yEach = yDist/steps;


    const obj = {
      x: start.x + xEach * i,
      y: start.y + yEach * i,
    } 
    return obj 
    
  })
  return arr

};




//‘#’+(Math.random()*0xFFFFFF<<0).toString(16);
// Math.floor(Math.random()*8**8).toString(16);


// export const getRandomChromaColor = () => {
//     return `${Math.floor(Math.random() * 16777215)}`
// }


//export const getColorGradient = () => chroma.scale([chroma(getRandomChromaColor()), chroma(getRandomChromaColor())])
export const getColorGradient = (color1, color2) => {
    // console.log(color1);
  return  chroma.scale([chroma.gl(chroma(color1)), chroma(color2)])
}




export const checkNeighbors = (thisThing, others, offset = 0) => {
  // console.log(thisThing);
   const othersToCheck = others.filter(item => item.id !== thisThing.id);
   const checks = othersToCheck.map(other => {
            // console.log('checking', thisThing.location.x, thisThing.location.y, thisThing.headSize);
               const dx = other.location.x - thisThing.location.x;
               const dy = other.location.y - thisThing.location.y;
               const dist = Math.sqrt(dx * dx + dy * dy);
               if(dist < other.headSize + thisThing.headSize + offset){
                //  console.log('found');
                   return true
               } else {
                   return false
               }
       })    
       const truthy = checks.filter(item => item === true);
      //  console.log(truthy);
       if(truthy.length > 0){
           return true
       } else {
           return false
       }

}

// const getClosestNeighbor = (bird, birds) => {

//     const otherBirds = birds.filter( otherBird => otherBird.id !== bird.id )

//     const withDistances = otherBirds.map( otherBird => {
//         const dx = otherBird.location.x - bird.location.x;
//         const dy = otherBird.location.y - bird.location.y;  
//         return {
//           ...otherBird,
//           distance: Math.sqrt(dx * dx + dy * dy),
//         }
//     })
//     const sorted = withDistances.sort((a,b) => (a.distance > b.distance) ? 1 : -1);
//     return sorted[0]

// }

export const getDistance = (pos1, pos2) => {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy) 
}


export const getAntiSocialDirection = (bird, birds) => {
      // const closest =  getClosestNeighbor(bird, birds);
      // console.log(closest);

      return [0,0]
}

export const makeBaseBird = (idx) => {
  const basebird = new BirdBaseValues(idx)
  return basebird
}

export const makeBird = (birdbasebird, svgWidth, svgHeight) => {
  const newBird = new BirdData(birdbasebird, svgWidth, svgHeight)
  return newBird
}


export const checkRandomEyeMove = (val, moveVal) => {
    const coin = Math.random() > val ? true : false;
    return coin ? Math.random() * moveVal - moveVal : 0 
}


export const rotate = (cx, cy, x, y, angle) =>  {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return {
    x: nx,
    y: ny,
  }
}
