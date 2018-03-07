import DialogActor from "./DialogActor";
import DynamicImage from "./DynamicImage";
import GameObject from "../GameObject";



export default class Character extends DynamicImage(DialogActor(GameObject)) {}
