import {GameObjectConstructor} from "./Mixins";
import AniEvents from "../animation/AniEvents";

function AnimationActor<TBase extends GameObjectConstructor>(Base: TBase) {
    return class extends Base {
        async fadeIn(speed = 0.25): Promise<void> {
            return AniEvents.fadeIn(this, speed);
        }

        async fadeOut(speed = 0.25): Promise<void> {
            return AniEvents.fadeOut(this, speed);
        }

    }
}

export default AnimationActor;