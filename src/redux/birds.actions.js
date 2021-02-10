// import Bird from '../components/Bird';
import { BirdActionTypes } from './birds.actions.types';


export const resizeScreen = (width, height) => {
    return {
        type: BirdActionTypes.RESIZE_SCREEN,
        payload: {
            width,
            height
        }
    };
}


export const checkOffScreen = () => {
    return {
        type: BirdActionTypes.CHECK_OFFSCREEN,
    }
}

export const checkTooSmall = () => {
    return {
        type: BirdActionTypes.CHECK_TOOSMALL,
    }
}

export const updateBuffers = ( buffers) => {
    return {
        type: BirdActionTypes.UPDATE_BUFFERS,
        payload : {
            buffers
        }
    }
}

export const addBirds = (birds) => {
    return {
        type: BirdActionTypes.ADD_BIRDS,
        payload : {
            birds
        }
    }
}

export const addBaseBirds = ( basebirds) => {
    return {
        type: BirdActionTypes.ADD_BASE_BIRDS, 
        payload: {
            basebirds
        }
    }
}

export const hatchBirds = (idx) => {
    return {
        type :  BirdActionTypes.HATCH_BIRDS,
        payload : {
            idx
        }
    }
}

export const moveBirds = () => {
    return {
        type: BirdActionTypes.MOVE_BIRDS,
    }
}

export const resetFluttering = () => {
    return {
        type: BirdActionTypes.RESET_FLUTTERING,
    }
}

export const updateDraggingBird = (idx, mousePos) => {
    return {
        type : BirdActionTypes.UPDATE_DRAGGING_BIRD,
        payload : {
            idx,
            mousePos
        }
    }
}

export const triggerBouncing = (idx) => {
    return {
        type: BirdActionTypes.TRIGGER_BOUNCING,
        payload: {
            idx
        }
    }
}

export const resetBouncing = (idx) => {
    return {
        type: BirdActionTypes.RESET_BOUNCING,
        payload: {
            idx
        }
    }
}

export const decrementBounceCount = (idx) => {
    return {
        type: BirdActionTypes.DECREMENT_BOUNCE_COUNT,
        payload: {
            idx
        }
    }
}

export const decrementFlutterCount = () => {
    return {
        type: BirdActionTypes.DECREMENT_FLUTTER_COUNT,
    }
}

export const flutterBirds = () => {
    return {
        type: BirdActionTypes.FLUTTER_BIRDS,
    }
}

export const checkEdges = () => {
    return {
        type : BirdActionTypes.CHECK_EDGES,
    }
}

export const resetTriggerSound = (idx) => {
    return {
        type: BirdActionTypes.RESET_TRIGGER_SOUND,
        payload : {
            idx
        }
    }
}

export const resetTriggerSoundAsync = (idx) => {
    return dispatch => {
        setTimeout(() => dispatch(resetTriggerSound(idx)), 0)
    }
}

export const startRoutine = ( ) => {
    return {
        type: BirdActionTypes.START_ROUTINE,
    }
}

export const toggleRoutinePlaying = ( ) => {
    return {
        type: BirdActionTypes.TOGGLE_ROUTINE_PLAYING,
    }
}

export const playNotNow = ( ) => {
    return {
        type: BirdActionTypes.PLAY_NOT_NOW,
    }
}


export const runRoutine = ( ) => {
    return {
        type: BirdActionTypes.RUN_ROUTINE,
    }
}



export const checkForOverlaps = () => {
    return {
        type: BirdActionTypes.CHECK_FOR_OVERLAPS,
    }
}

export const changeEyeColor = (id) => {
    return {
        type: BirdActionTypes.CHANGE_EYE_COLOR,
        payload : {
            id
        }
    }
}

export const addBaseBird = (basebird) => {
    return {
        type: BirdActionTypes.ADD_BASE_BIRD,
        payload : {
            basebird
        }
    }
}

export const addBird = (bird) => {
    return {
        type: BirdActionTypes.ADD_BIRD,
        payload : {
            bird
        }
    }
}

export const playBird = (idx, eyeRollOffset, beingPlayedCount, pbDir) => {
    return {
        type : BirdActionTypes.PLAY_BIRD,
        payload : {
            idx,
            eyeRollOffset,
            beingPlayedCount,
            pbDir,
        }
    }
}

export const updateBeingPlayedBird = id => {
    return {
        type : BirdActionTypes.UPDATE_BEING_PLAYED_BIRD,
        payload : {
            id
        }
    }
}

export const resetBird = (idx) => {
    return {
        type : BirdActionTypes.RESET_BIRD,
        payload : {
            idx,
        }
    }
}

// export const resetBirdWithTimeout = (idx, wait) => {
//     return dispatch => 
//         setTimeout(() => {
//             dispatch(resetBird(idx));
//             console.log('reset bird', idx);
//         }, wait); 
// }

export const checkNeighborBirds = (idx) => {
    return {
        type: BirdActionTypes.CHECK_NEIGHBOR_BIRDS,
        payload: {
            idx
        }
    }
}

export const growBird = (idx) => {
    return {
        type: BirdActionTypes.GROW_BIRD,
        payload: {
            idx
        }
    }
}


export const incrementIDX = () => {
    return {
        type: BirdActionTypes.INCREMENT_IDX,
    }
}


export const removeBird = (idx) => {
    return {
        type: BirdActionTypes.REMOVE_BIRD,
        payload: {
            idx
        }
    }
}

export const fixBird = () => {
    return {
        type: BirdActionTypes.FIX_BIRD,
        payload: {
           
        }
    }
}


export const startTicker = () => {
    return {
        type: BirdActionTypes.TICKER_STARTED,
    }
}

export const stopTicker = () => {
    return {
        type: BirdActionTypes.TICKER_STOPPED,
    }
}

export const tickTime = () => {
    return {
        type: BirdActionTypes.TICK_TIME,
    }
}

export const growHead = () => {
    return {
        type: BirdActionTypes.GROW_HEAD,
    }
}

export const updateClicked = (idx) => {
    return {
        type : BirdActionTypes.UPDATE_CLICKED,
        payload: {
            idx
        } 

    }
}

export const updateHovered = (idx) => {
    return {
        type : BirdActionTypes.UPDATE_HOVERED,
        payload: {
            idx
        } 

    }
}

export const resetHovered = () => {
    return {
        type : BirdActionTypes.RESET_HOVERED, 

    }
}

export const resetClicked = () => {
    return {
        type : BirdActionTypes.RESET_CLICKED, 

    }
}

export const resetGrowing = () => {
    return {
        type : BirdActionTypes.RESET_GROWING, 

    }
}

export const updateMousePos = (x, y) => {
    return {
        type: BirdActionTypes.UPDATE_MOUSE_POS,
        payload: {
            x,
            y
        }
    }
}

export const breatheAll = () => {
    return {
        type : BirdActionTypes.BREATHE_ALL,
        
    }
}

export const rollEyes = (id, offsetX, offsetY) => {
    // console.error('ROLL EYES ACTION');
    return {
        type: BirdActionTypes.ROLL_EYES,
        payload: {
            id,
            offset: { x: offsetX, y: offsetY },
        }
    }
}

export const moveEyes = () => {
    return {
        type: BirdActionTypes.MOVE_EYES,
    }
}

export const checkPopSize = () => {
    return {
        type: BirdActionTypes.CHECK_POP_SIZE,
    }
}

export const popBird = (idx) => {
    return {
        type: BirdActionTypes.POP_BIRD,
        payload: {
            idx
        }
    }
}



