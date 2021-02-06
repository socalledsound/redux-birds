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

export const updateBuffers = ( buffers) => {
    return {
        type: BirdActionTypes.UPDATE_BUFFERS,
        payload : {
            buffers
        }
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


export const checkNeighbors = () => {
    return {
        type: BirdActionTypes.CHECK_NEIGHBORS,
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
