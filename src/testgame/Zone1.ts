import StartArea from "./StartArea";
import Hallway from "./Hallway";
import SecondArea from "./SecondArea";

export class Zone1 {

    static get StartArea() {
        return StartArea;
    }

    static get Hallway() {
        return Hallway;
    }

    static get SecondArea() {
        return SecondArea;
    }

}
