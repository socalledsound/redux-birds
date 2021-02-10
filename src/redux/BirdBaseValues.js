import { getRandomPurple, getRandomColor } from "../utils";


class BirdBaseValues {
    constructor(index){
        this.id = index;
        this.randomXScaler = Math.random();
        this.randomYScaler = Math.random();
        this.randomHeadSizeScaler = Math.random();
        this.color1 = getRandomPurple();
        this.color2 = getRandomPurple();
        this.color3 = getRandomColor();
        // console.log(index);
    }
}

export default BirdBaseValues