import GameObject from "./GameObject";
import DialogContainer from "./components/DialogContainer";
import AnimationActor from "./components/AnimationActor";
import './components/DialogStyle.scss';
import TimingEventEnabled from "./components/TimingEventEnabled";

export default class AreaDialog extends TimingEventEnabled(AnimationActor(DialogContainer(GameObject))){

}