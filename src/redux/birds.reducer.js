import GlobalSettings from '../GlobalSettings';
import { BirdActionTypes } from './birds.actions.types';
import BirdData from './BirdData';
import { checkRandomEyeMove, checkNeighbors } from '../utils';
import { generatePlaybackProbability, getPlaybackValues } from '../PLAYBACK_ROUTINE';



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
    buffers: [],
    birdBaseValues: [],
    birds: [],
    timeTick: 0,
    currentIDX: 0,
    mousePos: {x: 0, y: 0},
    playbackValues: [{bufnum: 0, duration: 0.0, rate: 0.0, dir: 1, vol: 0.0 }],
    playBackIndex: 0,
    activeID: null,
    initResize: false,
    tickerStarted: false,
    dragActive: false,
    routineStarted: false,
    routinePlaying : false,
    playNow: false,
    fluttering: false,
    flutterCount: 0,
    
}


export const birdReducer = (state = INITIAL_STATE, action) => {

//    const { birdBaseValues, birds, currentIDX } = state;

    switch(action.type) {

        case BirdActionTypes.RESIZE_SCREEN :
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
        case BirdActionTypes.START_ROUTINE : 
            return {
                ...state,
                routineStarted : true
            }   

            case BirdActionTypes.TOGGLE_ROUTINE_PLAYING : 
            return {
                ...state,
                routinePlaying : !state.routinePlaying
            }    
            case BirdActionTypes.PLAY_NOT_NOW : 
            return {
                ...state,
                playNow : false,
            }   
            case BirdActionTypes.CHECK_OFFSCREEN : 
            
            const offscreenBirds = [...state.birds].map(bird => {
                if(bird.location.x < 0){
                    bird.location.x = 100;
                }
                if(bird.location.x > state.svgWidth){
                    bird.location.x = state.svgWidth -100;
                }
                if(bird.location.y < 0){
                    bird.location.y = 100;
                }
                if(bird.location.y > state.svgHeight){
                    bird.location.y = state.svgHeight - 100;
                }
                    
                return bird
            });
            return {
                ...state,
                birds: offscreenBirds,
            }

            case BirdActionTypes.CHECK_TOOSMALL :
            const tooSmallBirds = [...state.birds].map(bird => {
                if(bird.headSize < 20){
                    bird.headSize = 20;
                }
                    
                return bird
            });
            return {
                ...state,
                birds: tooSmallBirds,
            }

            case BirdActionTypes.MOVE_BIRDS : 
            
            const movedBirds = [...state.birds].map(bird => {
                if(bird.fluttering && !bird.dragging){
                    const flutterDirX = Math.random() > 0.7 ? -1 : 1;
                    const flutterDirY = Math.random() > 0.7 ? -1 : 1;
                    bird.location.x += bird.velocity.x *= flutterDirX;
                    bird.location.y += bird.velocity.y *= flutterDirY;
                    bird.velocity.x *= bird.flutterFriction;
                    bird.velocity.y *= bird.flutterFriction;
                } else if(bird.dragging){
                    
                    bird.location.x += bird.velocity.x;
                    bird.location.y += bird.velocity.y;
                    bird.velocity.x *= bird.dragFriction;
                    bird.velocity.y *= bird.dragFriction;
                }

               
                return bird
            });
            return {
                ...state,
                birds: movedBirds,
            }

        
            case BirdActionTypes.UPDATE_DRAGGING_BIRD :
                const draggedBirds = [...state.birds];
                const previous = draggedBirds[action.payload.idx].location;
                draggedBirds[action.payload.idx].velocity = {   x: action.payload.mousePos.x - previous.x, 
                                                                y: action.payload.mousePos.y - previous.y, 
                                                            };
                draggedBirds[action.payload.idx].location = {   x: action.payload.mousePos.x, 
                                                                y: action.payload.mousePos.y, 
                                                            };                                            
                draggedBirds[action.payload.idx].dragging = true;
            return {
                ...state,
                birds: draggedBirds,
            }
            

            case BirdActionTypes.FLUTTER_BIRDS : 
            
            const flutteredBirds = [...state.birds].map(bird => {
                if(!bird.dragging){
                    bird.velocity =  { x: Math.random() * 7.0, y: Math.random() * 7.0 };
                    bird.fluttering = true;
                }
  
                return bird
            });
            return {
                ...state,
                birds: flutteredBirds,
                fluttering: true,
                flutterCount: 100,
            }


            case BirdActionTypes.CHECK_EDGES : 
                const checkEdgeBirds = [...state.birds].map( bird => {
                    const offset = (bird.headSize * 1.2);
                    if(bird.location.x + offset > state.svgWidth || bird.location.x < 0 + offset){
                        
                        bird.velocity.x *= -1;
                        bird.headSize *= 0.9;
                        bird.location.x += bird.velocity.x * 2.0;
                        bird.triggerSound= true;
                    }
                    if(bird.location.y + offset > state.svgHeight || bird.location.y < 0 + offset){
                        
                        bird.velocity.y *= -1
                        bird.location.y += bird.velocity.y * 2.0;
                        bird.headSize *= 0.9;
                        bird.triggerSound = true;
                    }
                    return bird
                })
            
            return {
                ...state,
                birds: checkEdgeBirds,
            }

        case BirdActionTypes.RESET_TRIGGER_SOUND :
            
            const resetTriggeredBird = [...state.birds];
            resetTriggeredBird[action.payload.idx].triggerSound = false;
            return {
                ...state,
                birds: resetTriggeredBird,
            }    

        case BirdActionTypes.PLAY_BIRD : 
            
            const playBackBirds = [...state.birds];
            // console.log(action.payload.beingPlayedCount);
            playBackBirds[action.payload.idx].beingPlayed = true; 
            playBackBirds[action.payload.idx].beingPlayedCount = action.payload.beingPlayedCount;
            playBackBirds[action.payload.idx].eyeRollOffset = action.payload.eyeRollOffset; 
            playBackBirds[action.payload.idx].playDir = action.payload.pbDir; 
            playBackBirds[action.payload.idx].irisColor = playBackBirds[action.payload.idx].redIrisColor; 
             console.log(playBackBirds[action.payload.idx].beingPlayed, playBackBirds[action.payload.idx].beingPlayedCount);
            return {
                ...state,
                birds: playBackBirds,
            }

            case BirdActionTypes.UPDATE_BEING_PLAYED_BIRD :
            const updateBeingPlayedBirds = [...state.birds];
            const newRandomOffsetX = (Math.random() * 20);
            const newRandomOffsetY = (Math.random() * 20);
            const dir = updateBeingPlayedBirds[action.payload.id].playDir;
            updateBeingPlayedBirds[action.payload.id].beingPlayedCount -= 1;
            updateBeingPlayedBirds[action.payload.id].eyeRollOffset.x += newRandomOffsetX * dir;
            updateBeingPlayedBirds[action.payload.id].eyeRollOffset.y += newRandomOffsetY * dir;
                    // console.log(updateBeingPlayedBirds[action.payload.id].beingPlayedCount);
            return {
                ...state,
                birds: updateBeingPlayedBirds
            }


            case BirdActionTypes.RESET_BIRD : 
          
            const resetPlayBirds = [...state.birds];

            resetPlayBirds[action.payload.idx].beingPlayed = false; 
            resetPlayBirds[action.payload.idx].irisColor = resetPlayBirds[action.payload.idx].mainIrisColor; 
            
            return {
                ...state,
                birds: resetPlayBirds,
            } 
            
            
            
            case BirdActionTypes.GROW_BIRD : 
           
            const growBirds = [...state.birds];            
            if(growBirds[action.payload.idx].clicked || growBirds[action.payload.idx].headSize < 20){
                growBirds[action.payload.idx].headSize += GlobalSettings.dragGrowInc;
                growBirds[action.payload.idx].growing = true; 
            } else {
                growBirds[action.payload.idx].headSize +=1;
            }
            return {
                ...state,
                birds: growBirds,
            }   
                       
        case BirdActionTypes.RUN_ROUTINE : 
            const playNow = generatePlaybackProbability();
            let newPlayBackIndex = state.playBackIndex;
            let newPlayBackValues = [...state.playbackValues];
            
            if(playNow && !state.routinePlaying){
                const birdNum = Math.floor(Math.random() * state.birds.length);
                const bufnum = birdNum % state.buffers.length;
                const choice = state.buffers[bufnum];
                const generatedPlayBackValues = getPlaybackValues(bufnum, birdNum, choice);
                newPlayBackIndex += 1;
                newPlayBackValues.push(generatedPlayBackValues);

            }
 

            return {
                ...state,
                playNow: playNow,
                playBackIndex: newPlayBackIndex,
                playbackValues: newPlayBackValues,

            }   

        case 'CHECK_NEIGHBOR_BIRDS' : 
               
            const checkedNeighbors = [...state.birds].map( bird => {

                if(checkNeighbors(bird, state.birds, bird.headSize/50) && !bird.growing && !bird.dragging){
                    bird.velocity.x *= -1;
                    bird.velocity.y *= -1;
                    bird.headSize *= 0.9;
                    bird.location.x += bird.velocity.x * (GlobalSettings.bumpJumpMin + (Math.random() * GlobalSettings.bumpJumpMax));
                    bird.location.y += bird.velocity.y * (GlobalSettings.bumpJumpMin + (Math.random() * GlobalSettings.bumpJumpMax));
                    bird.triggerSound= true;
                }


                return bird
            })
                            return {
                                ...state,
                                circles: checkedNeighbors,
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
            clickedBirds[action.payload.idx].fluttering = false; 
        
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

        case BirdActionTypes.TRIGGER_BOUNCING :
            
                const bouncingBirds = [...state.birds];
                    bouncingBirds[action.payload.idx].bouncing = true;   
                    bouncingBirds[action.payload.idx].bounceCount = 10;
                
                    return {
                        ...state,
                        birds: bouncingBirds,
                    }
        case BirdActionTypes.RESET_BOUNCING :

            const resetBouncing = [...state.birds];
                resetBouncing[action.payload.idx].bouncing = false;   
               
            
                return {
                    ...state,
                    birds: resetBouncing,
                }                    
        case BirdActionTypes.DECREMENT_BOUNCE_COUNT :
            const   decBounceCount = [...state.birds];
                    decBounceCount[action.payload.idx].bounceCount -=1;
                    return {
                        ...state,
                        birds: decBounceCount,
                        
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
                    growing: false,
                    dragging: false,
                }
                return newObj
            });


        
            return {
                ...state,
                birds: resetBirds,
                dragActive: false,
                activeId: null,
            }  
            
            case BirdActionTypes.RESET_FLUTTERING :
                const notFlutteringBirds = [...state.birds].map( bird => 
                     ({
                        ...bird,
                        fluttering : false,
                     })
                )
                    

                return {
                    ...state,
                    birds: notFlutteringBirds,
                    fluttering: false,
                    
                }  
            case BirdActionTypes.DECREMENT_FLUTTER_COUNT :

                    return {
                        ...state,
                        flutterCount: state.flutterCount -1,
                        
                    }    
             

        case BirdActionTypes.CHANGE_EYE_COLOR : 
            const toggledBirds = [...state.birds];
            const toggle = !toggledBirds[action.payload.id].eyeToggle;
            const clicked = !toggledBirds[action.payload.id].clicked;
            toggledBirds[action.payload.id].eyeToggle = toggle;
            toggledBirds[action.payload.id].irisColor = toggle ? toggledBirds[action.payload.id].redIrisColor : toggledBirds[action.payload.id].mainIrisColor;
            toggledBirds[action.payload.id].irisColor = clicked ? toggledBirds[action.payload.id].redIrisColor : toggledBirds[action.payload.id].irisColor;

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

                return {
                    ...state,
                    // birds: notOverlaps.concat(movedBirds),
                    // birds
                }    
        
        case BirdActionTypes.CHECK_POP_SIZE : 
            const poppingBirds = [...state.birds].map(bird => {
                bird.headSize > state.svgHeight/4.5 ? bird.popping = true : bird.notPopping = true;
                bird.headSize > state.svgHeight/4.5 ? bird.pop = true : bird.pop = false;
                return bird
            })

                return {
                    ...state,
                    birds: poppingBirds, 
                }

        case BirdActionTypes.POP_BIRD : 
                const poppedBirds = [...state.birds];
                console.log(action.payload.idx)
                poppedBirds[action.payload.idx].headSize = 20;
                return {
                    ...state,
                    birds: poppedBirds,
                }        

        default: 
            return state
    }


}


// case BirdActionTypes.CHECK_FOR_OVERLAPS :


//     // const overlaps = birds.filter(bird => checkNeighbors(bird, birds));
//     // const notOverlaps = birds.filter(bird => !checkNeighbors(bird, birds));
//     // // console.log(overlaps);
//     // const movedBirds = overlaps.map(bird => {
//     //     const vector = getAntiSocialDirection(bird, overlaps);
//     //     bird.location.x += vector[0];
//     //     bird.location.y += vector[1];
//     //     return bird 
//     //     })
//     // birds.forEach(bird => {
//     //     // console.log(bird.id);

//     //     if(checkNeighbors(bird, birds)){
//     //         // const location = getClosestNeighbor(bird, birds);
//     //         console.log(bird.id);
//     //     };
//     // })

//         return {
//             ...state,
//             // birds: notOverlaps.concat(movedBirds),
//             // birds
//         }    
  