import GlobalSettings from '../GlobalSettings';
import { BirdActionTypes } from './birds.actions.types';
import BirdData from './BirdData';
// import BirdBaseValues from './BirdBaseValues';
import { checkRandomEyeMove } from '../utils';
// import Bird from '../components/Bird';


// const initBirds = Array.from({ length : 3 }, (_, index) => {
//     return new BirdData(index)
// })


// console.log(GlobalSettings.numBirds);
// const neighbors = [];
// const birdBaseValues = Array.from({ length: GlobalSettings.numBirds}, (_, i) => {
//     return new BirdBaseValues(i);
// //    const thisThing = new BirdBaseValues(i);


// });

const INITIAL_STATE = {
    svgWidth: GlobalSettings.defaultWidth,
    svgHeight: GlobalSettings.defaultHeight,
    initResize: false,
    currentIDX: 0,
    timeTick: 0,
    mousePos: {x: 0, y: 0},
    tickerStarted: false,
    dragActive: false,
    activeID: null,
    buffers: [],
    birdBaseValues: [],
    birds: [],
}


export const birdReducer = (state = INITIAL_STATE, action) => {

//    const { birdBaseValues, birds, currentIDX } = state;

    switch(action.type) {

        case BirdActionTypes.RESIZE_SCREEN :
           // console.log(state.currentIDX);
            // const resizedBirdsArray = Array.from({ length : state.currentIDX }, (_, i) => {
            //     if( state.currentIDX !== 0){
            //         // console.log(resized[i]);
            //         return new BirdData(state.birdBaseValues[i],  action.payload.width, action.payload.height)
            //     } else {
            //         return null
            //     }
            console.log(state.birdBaseValues); 
            const resizedBirdsArray = [...state.birdBaseValues].map(bb => new BirdData(bb, action.payload.width, action.payload.height));
        console.log(resizedBirdsArray);
            return {
                ...state,
                svgWidth: action.payload.width,
                svgHeight: action.payload.height,
                initResize: true,
                birds: resizedBirdsArray,
            }
        case BirdActionTypes.UPDATE_BUFFERS :
            //console.log(action.payload);
            return {
                ...state,
                buffers: action.payload.buffers
            }


        case BirdActionTypes.ADD_BASE_BIRDS : 
            return {
                ...state,
                birdBaseValues: action.payload.basebirds
            }    

        case BirdActionTypes.ADD_BIRDS : 
            return {
                ...state,
                birds: action.payload.birds
            }   
            
        case BirdActionTypes.HATCH_BIRDS : 
        console.log(state.birds, 'in reducer');
        console.log(action.payload, 'in reducer');
        const updatedBirds = [...state.birds];
        if(updatedBirds.length > 0){
            updatedBirds.map( bird => bird.headSize = bird.startTween[action.payload.idx]);
        }
        
            
        return {
            ...state,
             birds: updatedBirds,
        }    

        case BirdActionTypes.ADD_BASE_BIRD :
            const newBirdBases = [...state.birdBaseValues].concat([action.payload.birdbase])
            return {
                ...state,
                birdBaseValues : newBirdBases,
            }

        case BirdActionTypes.ADD_BIRD :
                const addedBird = [...state.birds].concat([action.payload.bird])
                return {
                    ...state,
                    birds: addedBird
                }   
        case 'CHECK_NEIGHBORS' : 
               
                            //console.log(state.currentIDX, 'in neighbors reducer');
                        
                            const birdToCheck = [...state.birds].filter(bird => bird.id === state.currentIDX);
                            const thisBird = birdToCheck[0];
                            // console.log(thisBird);
                            const otherBirds = [...state.birds].filter(bird => bird.id !== state.currentIDX);
                            //console.log(otherBirds);
                            otherBirds.forEach(otherBird => {
                                    //console.log(otherBird);
                                    const dx = otherBird.location.x - thisBird.location.x;
                                    const dy = otherBird.location.y - thisBird.location.y;
                                    const dist = Math.sqrt(dx * dx + dy * dy);
                                    if(dist < otherBird.headSize + thisBird.headSize + 10){
                                        //console.log('overlapping');
                                        // thisBird.fill = GlobalSettings.warningColor;
                                        thisBird.overlap = true;
                                    }
                            })  
                            return {
                                ...state,
                                circles: otherBirds.concat(birdToCheck),
                            } 
        case 'INCREMENT_IDX' : 
            const curr = state.currentIDX + 1
            //console.log(curr);
            return {
                ...state,
                currentIDX: curr,
        }   
        case BirdActionTypes.REMOVE_BIRD :

            return {
                ...state,
                birds: [...state.birds].filter(bird => bird.id !== state.currentIDX),
            }  
            
        case 'FIX_BIRD' : 
            const birdToFix = [...state.birds].filter(bird => bird.id === state.currentIDX);
            const fixedBirds = [...state.birds].filter(bird => bird.id !== state.currentIDX);
            birdToFix[0].opacity = GlobalSettings.settledOpacity;
            // circleToFix[0].fill = GlobalSettings.settledColor;
            return {
                ...state,
                circles: fixedBirds.concat(birdToFix),
            }      

        case BirdActionTypes.TICKER_STARTED :
            //console.log('ticker started')
            return {
                ...state,
                tickerStarted : true,
            }         
        
        case BirdActionTypes.TICK_TIME :
            // console.log('tickTime')
            const newCount = state.timeTick + 1;
            return {
                ...state,
                timeTick : newCount,
            } 
            
        case BirdActionTypes.BREATHE_ALL :
            // console.log('breathing')
                const breatheBirds = [...state.birds]
                                            .map( bird => {
                                                bird.theta += bird.breatheRate;
                                                bird.headSize += Math.sin(bird.theta)/5;
                                                return bird
                                            });
                return {
                    ...state,
                    birds: breatheBirds
                }     

        case BirdActionTypes.MOVE_EYES :
            const eyeBirds = [...state.birds]
                                    .map( bird => {
                                        const prob = bird.eyeToggle ? bird.fastCoinVal : bird.slowCoinVal;
                                        bird.randomLeftEyeVal = checkRandomEyeMove(prob, bird.eyeMoveVal);
                                        bird.randomRightEyeVal = checkRandomEyeMove(prob, bird.eyeMoveVal);
                                        return bird
                                    });
                return {
                    ...state,
                    birds: eyeBirds
                }


        case BirdActionTypes.UPDATE_CLICKED :
            
            const clickedBirds = [...state.birds];
            clickedBirds[action.payload.idx].clicked = !clickedBirds[action.payload.idx].clicked;   
            const newActiveID = clickedBirds[action.payload.idx].clicked ? action.payload.idx : null;
            const newDragActive = clickedBirds[action.payload.idx].clicked ? true : false;
        
            return {
                ...state,
                birds: clickedBirds,
                dragActive: newDragActive,
                activeID: newActiveID,
                mouseRef: state.mousePos,
            }

            case BirdActionTypes.UPDATE_HOVERED :
            
                const hoveredBirds = [...state.birds];
                hoveredBirds[action.payload.idx].hovered = !hoveredBirds[action.payload.idx].hovered;   
                // const newActiveID = clickedBirds[action.payload.idx].clicked ? action.payload.idx : null;
                // const newDragActive = clickedBirds[action.payload.idx].clicked ? true : false;
            
                return {
                    ...state,
                    birds: hoveredBirds,
                }


        case BirdActionTypes.UPDATE_MOUSE_POS :
            return {
                ...state,
                mousePos: {x: action.payload.x, y: action.payload.y}
            }

        case BirdActionTypes.RESET_CLICKED :
            const resetBirds = [...state.birds].map(bird => {
                const newObj = {
                    ...bird,
                    clicked: false,
                }
                return newObj
            });
        
            return {
                ...state,
                birds: resetBirds,
                dragActive: false,
                activeId: null,
            }    

        case BirdActionTypes.CHANGE_EYE_COLOR : 
            const toggledBirds = [...state.birds];
            const toggle = !toggledBirds[action.payload.id].eyeToggle;
            toggledBirds[action.payload.id].eyeToggle = toggle;
            toggledBirds[action.payload.id].irisColor = toggle ? toggledBirds[action.payload.id].redIrisColor : toggledBirds[action.payload.id].mainIrisColor;

            return {
                ...state,
                birds: toggledBirds

            }    
        case BirdActionTypes.ROLL_EYES :
            const eyeRollBirds = [...state.birds];
            eyeRollBirds[action.payload.id].eyeRollOffset = action.payload.offset;
            // console.error('ROLL EYES: ', action.payload.offset);
            return {
                ...state,
                birds: eyeRollBirds,

            }    


        case BirdActionTypes.CHECK_FOR_OVERLAPS :


            // const overlaps = birds.filter(bird => checkNeighbors(bird, birds));
            // const notOverlaps = birds.filter(bird => !checkNeighbors(bird, birds));
            // // console.log(overlaps);
            // const movedBirds = overlaps.map(bird => {
            //     const vector = getAntiSocialDirection(bird, overlaps);
            //     bird.location.x += vector[0];
            //     bird.location.y += vector[1];
            //     return bird 
            //     })
            // birds.forEach(bird => {
            //     // console.log(bird.id);

            //     if(checkNeighbors(bird, birds)){
            //         // const location = getClosestNeighbor(bird, birds);
            //         console.log(bird.id);
            //     };
            // })

                return {
                    ...state,
                    // birds: notOverlaps.concat(movedBirds),
                    // birds
                }    
          

        default: 
            return state
    }


}