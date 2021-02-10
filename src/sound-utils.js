// import soundFile0 from './assets/sounds/0.mp3';
import soundFile0 from './assets/sounds/2.mp3';
import soundFile1 from './assets/sounds/1.mp3';
import soundFile2 from './assets/sounds/0.mp3';
import soundFile3 from './assets/sounds/3.mp3';
import soundFile4 from './assets/sounds/4.mp3'
import soundFile5 from './assets/sounds/5.mp3';
 import soundFile6 from './assets/sounds/6.mp3';
import soundFile7 from './assets/sounds/7.mp3';
// import soundFile8 from './assets/sounds/8.mp3';
// import soundFile9 from './assets/sounds/9.mp3';

export const soundFilesArray = [
    soundFile0,
    soundFile1,
    soundFile2,
    soundFile3,
    soundFile4,
    soundFile5,
    soundFile6,
    soundFile7,
]

export const audioContext = new AudioContext();


export const initBuffer = async (url) => {
        const response = await fetch(url);
        const ab = await response.arrayBuffer();
        const buffer = await audioContext.decodeAudioData(ab);
        console.log(buffer);
        return buffer
}

export const reverseBuffers = (buffers) => {

    const buffersCopy = [...buffers];

    buffersCopy.forEach( buffer => {
        console.log(buffer);
        Array.prototype.reverse.call( buffer.getChannelData(0) );
        Array.prototype.reverse.call( buffer.getChannelData(1) );
    })

    return buffersCopy
}



// export const initBuffers = async (arr) => {

//     return new Promise((resolve, reject) => {

//     })

//     return Promise.all( arr.map(item => initBuffer(item)))


//     // const buffers = arr.map( async (url, i) => {
//     //     const response = await fetch(url);
//     //     const ab = await response.arrayBuffer();
//     //     const buffer = await audioContext.decodeAudioData(ab);
//     //     return buffer
//     // })
//     // return buffers
// }