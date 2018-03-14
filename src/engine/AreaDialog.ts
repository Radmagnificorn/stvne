import GameObject from "./GameObject";
import DialogContainer from "./components/DialogContainer";
import AnimationActor from "./components/AnimationActor";
import './components/DialogStyle.scss';

export default class AreaDialog extends AnimationActor(DialogContainer(GameObject)){

}