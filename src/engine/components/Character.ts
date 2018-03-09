import DialogActor from "./DialogActor";
import DynamicImage from "./DynamicImage";
import GameObject from "../GameObject";
import AnimationActor from "./AnimationActor";



export default class Character extends AnimationActor(DynamicImage(DialogActor(GameObject))) {}
