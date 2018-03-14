import Area from "../engine/Area";
import GameObject from "../engine/GameObject";
import ResourceLoader from "../engine/ResourceLoader";
import ImageComponent from "../engine/components/ImageComponent";
import AE from "../engine/ActionEvents";
import Portal, {Exit} from "../engine/components/PortalComponent";
import AniEvents from "../engine/animation/AniEvents";

import Character from "../engine/components/Character";
import Hallway from "./Hallway";


class StartArea extends Area {

    private vampire: Character;
    private princess: Character;

    async buildScene(imgs: Map<string, HTMLImageElement>) {

        let dialog = this.dialogComponent;

        let toHallway = new Exit(0, 0, 720, 100);
        toHallway.initPortal(new Hallway(this._gameInstance));



        let background = new GameObject(0,0);
        background.addComponent(new ImageComponent(imgs.get('office'), true));


        //vampire

        let vampireDave = new Character(286, 60);
        vampireDave.initDialogActor(dialog, "Vampire Dave")
            .initDynamicImage(new Map([
                ["default", imgs.get('vamp_default')], ['handsup', imgs.get('vamp_handsup')]
            ]));


        //princess
        let princess = new Character(505,190);
        princess.initDialogActor(dialog, "Demon-eyed Princess")
            .initDynamicImage(new Map([['default', imgs.get("princess_default")]]));

        princess.element.style.opacity = '0';
        vampireDave.element.style.opacity = '0';
        this.princess = princess;

        this.vampire = vampireDave;

        this.setPortals(toHallway);


        this.gameLayer.appendChild(vampireDave);
        this.gameLayer.appendChild(princess);
        this.backgroundLayer.appendChild(background);


    }

    onReady() {
        this.events.main();
    }

    events = {
        main: async () => {
            let vampireDave = this.vampire;
            let d = this.dialogComponent;
            //await AE.pause(1000);
            let talkedToPrincess = await this.gameState.get("second_area.princess_talk");
            await d.fadeIn(1);
            if (!talkedToPrincess) {
                await this.events.vampireIntro();
            } else {
                await this.events.princessShowsUp();
            }

            await AE.waitForClick(d);
            await d.fadeOut();
            await vampireDave.fadeOut(1);
        },
        vampireIntro: async () => {
            let vampireDave = this.vampire;
            let d = this.dialogComponent;
            await vampireDave.fadeIn(1);
            let princessTalk = await this.gameState.get("second_area.princess_talk");
            if (princessTalk === "true") {
                await vampireDave.say("I see you talked to the princess");
            } else {
                await vampireDave.say("Hello, I am a vampire. Welcome to my study.", true);
                await AE.waitForClick(d);
                await vampireDave.showImage('handsup');
                await vampireDave.say("As you can see, I have many books", true);
                await AE.pause(100);
                await vampireDave.say(", and not just any books...", false);
                await AE.pause(250);
                await vampireDave.showImage('default');
                await vampireDave.say(" good books.", false);
            }

            await AE.waitForClick(d);
            let likesToRead = await vampireDave.ask("Do you like to read books?",
                ["Yes, books are awesome!", "No... not a fan.", "Books are for losers", "No, I'm too cool"]);
            switch (likesToRead) {
                case "Yes, books are awesome!":
                    await vampireDave.say("Yes, I thought you might");
                    await AE.waitForClick(d);
                    await vampireDave.say("What kind of books do you like to read?");
                    let fictionOrNo = await d.presentOptions(["Fiction", "Non-fiction"]);
                    if (fictionOrNo === "Fiction") {
                        await vampireDave.say("I am a fan of fiction myself");
                    } else {
                        await vampireDave.say("I see, well I generally prefer fiction myself");
                    }
                    break;
                case "Books are for losers":
                    await vampireDave.say("Yeah? well maybe books think that you're a loser...");
                    break;
                default:
                    await vampireDave.say("Oh, well that's ok...");
            }
            await AE.waitForClick(d);
            await vampireDave.say("You should head outside to the left and talk to the princess.");
            await AE.waitForClick(d);
            await vampireDave.showImage("handsup");
            await vampireDave.say("If at any time you aren't sure where you're going. You can show and hide the exit locations with that little white button in the top right corner of the screen.");
        },
        princessShowsUp: async () => {
            let princess = this.princess;
            let vampire = this.vampire;
            let dialog = this.dialogComponent;

            await AE.pause(1000);
            await vampire.fadeIn(1);
            await vampire.say("Oh, hi. How was your meeting with the princess?");
            await AE.waitForClick(dialog);
            await princess.fadeIn(1);
            let cabbages = await this.gameState.get("second_area.cabbages");
            await princess.say("Hey Dave, some weirdo just told me I look like I could carry " +
                (cabbages === "One" ? "only one cabbage" : `${cabbages.toLowerCase()} cabbages`) + "..." );
            await AE.waitForClick(dialog);
            await princess.say("oh wait! that's them right there.");
            await AE.waitForClick(dialog);
            await vampire.showImage("handsup");
            await vampire.say("well what do you want me to do about it?");
        }
    };



    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImagesToMap(new Map([
                ["office", require("./resources/office.png")],
                ["vamp_default", require("./resources/vamp_look_straight.png")],
                ["vamp_handsup", require("./resources/vamp_hands_up.png")],
                ["princess_default", require("./resources/princess.png")]
            ])).then(imgs => this.buildScene(imgs)).then(() => resolve());

        });
    }
}



export default StartArea;