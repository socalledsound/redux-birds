import soundFile0 from './assets/sounds/0.mp3';
import soundFile1 from './assets/sounds/1.mp3';
import soundFile2 from './assets/sounds/2.mp3';
// import soundFile3 from './sounds/3.mp3';
// import soundFile4 from './sounds/4.mp3';
// import soundFile5 from './sounds/5.mp3'
// import soundFile6 from './sounds/6.mp3';
// import soundFile7 from './sounds/7.mp3';
// import soundFile8 from './sounds/8.mp3';
// import soundFile9 from './sounds/9.mp3';

export const soundFilesArray = [
    soundFile0,
    soundFile1,
    soundFile2,
]

export const audioContext = new AudioContext();


export const initBuffer = async (url) => {
        const response = await fetch(url);
        const ab = await response.arrayBuffer();
        const buffer = await audioContext.decodeAudioData(ab);
        console.log(buffer);
        return buffer
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

export const reverseBuffers = (buffers) => {

    const buffersCopy = [...buffers];

    buffersCopy.forEach( buffer => {
        console.log(buffer);
        Array.prototype.reverse.call( buffer.getChannelData(0) );
        Array.prototype.reverse.call( buffer.getChannelData(1) );
    })

    return buffersCopy
}