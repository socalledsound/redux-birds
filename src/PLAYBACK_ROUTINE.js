
export const RoutineSettings = {
    globalCoin : 0.9,
}

export const generatePlaybackProbability = () => {
    return Math.random() > RoutineSettings.globalCoin ? true : false;
    
}

export const getPlaybackValues = (bufnum, birdNum, buffer) => {
    
    const playLength = Math.random() * (buffer.duration * 2.0);
    const rate = Math.random() * 2.0 + 0.5;
    const dir = Math.random() > 0.5 ? -1 : 1;
    const vol = (Math.random()* 2)/2.0;
    const offset = Math.random() * buffer.duration;

    return {
        bufnum,
        birdNum,
        playLength,
        rate,
        dir,
        vol,
        offset,
    }
}