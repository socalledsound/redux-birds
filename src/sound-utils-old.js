
import { Howl } from 'howler';

import sound0 from './assets/sounds/0.mp3';
import sound1 from './assets/sounds/1.mp3';
import sound2 from './assets/sounds/2.mp3';
// import sound3 from './assets/sounds/3.mp3';
// import sound4 from './assets/sounds/4.mp3';
// import sound5 from './assets/sounds/5.mp3';
// import sound6 from './assets/sounds/6.mp3';
// import sound7 from './assets/sounds/7.mp3';
// import sound8 from './assets/sounds/8.mp3';
// import sound9 from './assets/sounds/9.mp3';

// const importAll = (r) =>  {
//     let sounds = {};
//     r.keys().forEach((item, index) => { sounds[item.replace('./', '')] = r(item); });
//     return sounds;
// }

// export const sounds = importAll(require.context('./assets/sounds/', false, /\.mp3$/));

// var context = require.context('./assets/sounds', true, /\.(png)$/);
// var files={};

// context.keys().forEach((filename)=>{
//   files[filename] = context(filename);
// });
// console.log(files);

// export const sounds = files;

// export const howls = Array.from(sounds, (el) => {
//     console.log(el);
//   return  new Howl({ src: [el]})
// });

// console.log(sound0);




// const numSounds = 10;

const howl0 = new Howl({src: [sound0]});
const howl1 = new Howl({src: [sound1]});
const howl2 = new Howl({src: [sound2]});
// const howl3 = new Howl({src: [sound3]});
// const howl4 = new Howl({src: [sound4]});
// const howl5 = new Howl({src: [sound5]});
// const howl6 = new Howl({src: [sound6]});

export const howls = [howl0, howl1, howl2];
// export const howls = [howl0, howl1, howl2, howl3, howl4, howl5, howl6];


// export const howls = Array.from({length: numSounds}, (el, i) => {
//     return new Howl({src: [`sound${i}`]})
// })

// export const sounds = [sound0, sound1, sound2,sound3,sound4];



// export const buffers = [];
// export let soundFileData;
// export const soundFileDatas = []
// export let numBuffers = 0;

// export const initSound = () => {

// }


// export const loadSounds = (sounds) => {
//     console.log(sounds);

// }
