import Area from "../engine/Area";
import GameObject from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import ImageComponent from "../engine/components/ImageComponent";
import AE from "../engine/ActionEvents";
import PortalComponent from "../engine/components/PortalComponent";
import SecondArea from "./SecondArea";
import AniEvents from "../engine/animation/AniEvents";
import DialogComponent from "../engine/components/DialogComponent";
import Game from "../engine/Game";
import GameState from "../engine/GameState";
import CharacterComponent from "../engine/components/CharacterComponent";

class StartArea extends Area {

    async buildScene(imgs: Map<string, HTMLImageElement>) {

        let gs = this._gameInstance.gameState;

        let d = this.dialogComponent;
        let dialogBox = this.dialogComponent.element;
        let exit = new GameObject();
        exit.addComponent(new PortalComponent(new SecondArea(this._gameInstance)));
        exit.width = 50;
        exit.height = 720;



        let background = new GameObject(0,0);
        background.addComponent(new ImageComponent(imgs.get('background'), true));


        //vampire
        let vampire = new GameObject(286, 60);
        let vampImageComponent = new CharacterComponent("vampire", {"default": imgs.get('vamp_default'), "handsup": imgs.get('vamp_handsup')});
        vampire.addComponent(vampImageComponent);


        this.gameLayer.appendChild(vampire);
        this.gameLayer.appendChild(exit);
        this.backgroundLayer.appendChild(background);

        vampire.element.style.opacity = '0';

        await this.events.vampireIntro(d, vampire, gs);

        await AE.waitForClick(dialogBox);
        await d.writeText("do you like to read books?");
        let likesToRead = await d.presentOptions(["Yes, books are awesome!", "No... not a fan.", "Books are for losers", "No, I'm too cool"], false);
        switch (likesToRead) {
            case "Yes, books are awesome!":
                await d.writeText("Yes, I thought you might");
                await AE.waitForClick(dialogBox);
                await d.writeText("What kind of books do you like to read?");
                let fictionOrNo = await d.presentOptions(["Fiction", "Non-fiction"]);
                if (fictionOrNo === "Fiction") {
                    await d.writeText("I am a fan of fiction myself");
                } else {
                    await d.writeText("I see, well I generally prefer fiction myself");
                }
                break;
            case "Books are for losers":
                await d.writeText("Yeah? well maybe books think that you're a loser...");
                break;
            default:
                return d.writeText("Oh, well that's ok...");
        }


        /*
        AE.pause(2000)()
            .then(() => AniEvents.fadeIn(vampire.element, 0.5))
            .then(() => gs.get("second_area.princess_talk"))
            .then(result => {
                if (result === "true") {
                    return d.writeText("I see you talked to the princess");
                } else {
                    return d.writeText("Hello, I am a vampire. Welcome to my study. As you can see, I have many books")
                        .then(AE.waitForClick(dialogBox))
                        .then(d.ae.writeText("and not just any books..."))
                        .then(AE.pause(500))
                        .then(d.ae.writeText("good books.", false))
                }
            })
            .then(AE.waitForClick(dialogBox))
            .then(d.ae.writeText("do you like to read books?"))
            .then(d.ae.presentOptions(["Yes, books are awesome!", "No... not a fan.", "Books are for losers", "No, I'm too cool"], false))
            .then((response) => {
                if (response === "Yes, books are awesome!") {
                    return d.writeText("Yes, I thought you might")
                        .then(AE.waitForClick(dialogBox))
                        .then(d.ae.writeText("What kind of books do you like to read?"))
                        .then(d.ae.presentOptions(["Fiction", "Non-fiction"]))
                        .then((response) => {
                            if (response === "Fiction") {
                                return d.writeText("I am a fan of fiction myself")
                            } else {
                                return d.writeText("I see, well I generally prefer fiction myself")
                            }
                        });
                } else if (response === "Books are for losers") {
                    return d.writeText("Yeah? well maybe books think that you're a loser...");
                } else {
                    return d.writeText("Oh, well that's ok...");
                }
            })
            .then(AE.waitForClick(dialogBox))
            .then(() => gs.get("second_area.princess_talk"))
            .then((pt) => {
                if (!pt) {
                    return d.writeText("You should head outside to the left and talk to the princess.")
                } else {
                    return d.writeText("Well, I guess I don't have much more to say. Please have a look around.")
                }
            })
            .then(AE.waitForClick(dialogBox))
            .then(() => d.hideDialog())
            .then(() => AniEvents.fadeOut(vampire.element, 1))
            */


    }

    events = {
        vampireIntro: async (d: DialogComponent, vampire: GameObject, gs: GameState) => {
            let vampChar = <CharacterComponent>vampire.components['character'];
            await AE.pause(2000);
            await AniEvents.fadeIn(vampire, 1);
            let princessTalk = await gs.get("second_area.princess_talk");
            if (princessTalk === "true") {
                await d.writeText("I see you talked to the princess");
            } else {
                await d.writeText("Hello, I am a vampire. Welcome to my study.");
                await AE.waitForClick(d);
                await vampChar.showPortrait('handsup');
                await d.writeText("As you can see, I have many books");
                await AE.pause(100);
                await d.writeText(", and not just any books...", false);
                await AE.pause(250);
                await vampChar.showPortrait('default');
                await d.writeText(" good books.", false);
            }
        }
    };



    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImagesToMap(new Map([
                ["background", "office.png"],
                ["vamp_default", "vamp_look_straight.png"],
                ["vamp_handsup", "test.png"]
            ]))
                .then(imgs => {
                    resolve();
                    this.buildScene(imgs)
                });

        });
    }
}



export default StartArea;