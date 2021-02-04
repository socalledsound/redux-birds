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

export const breatheAll = () => {
    return {
        type : BirdActionTypes.BREATHE_ALL,
        
    }
}


