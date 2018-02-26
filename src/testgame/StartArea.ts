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

    private vampire: CharacterComponent;
    private princess: CharacterComponent;
    private dialog: DialogComponent;

    async buildScene(imgs: Map<string, HTMLImageElement>) {

        let gs = this._gameInstance.gameState;

        let d = this.dialogComponent;
        let dialogBox = this.dialogComponent.element;
        this.dialog = d;
        let exit = new GameObject();
        exit.addComponent(new PortalComponent(new SecondArea(this._gameInstance)));
        exit.width = 50;
        exit.height = 720;



        let background = new GameObject(0,0);
        background.addComponent(new ImageComponent(imgs.get('background'), true));


        //vampire
        let vampire = new GameObject(286, 60);

        let vampireDave = new CharacterComponent("Vampire Dave", new Map([
            ["default", imgs.get('vamp_default')], ['handsup', imgs.get('vamp_handsup')]
        ]), d);
        vampire.addComponent(vampireDave);

        //princess
        let princessGo = new GameObject(505,190);
        let princess = new CharacterComponent("Demon-eyed Princess", new Map([['default', imgs.get("princess_default")]]), d);
        princessGo.addComponent(princess);
        princessGo.element.style.opacity = '0';
        this.princess = princess;

        this.vampire = vampireDave;


        this.gameLayer.appendChild(vampire);
        this.gameLayer.appendChild(princessGo);
        this.gameLayer.appendChild(exit);
        this.backgroundLayer.appendChild(background);

        vampire.element.style.opacity = '0';

        await this.events.vampireIntro(d, vampire, gs);

        await AE.waitForClick(dialogBox);
        let likesToRead = await vampireDave.ask("Do you like to read books?",
            ["Yes, books are awesome!", "No... not a fan.", "Books are for losers", "No, I'm too cool"]);
        switch (likesToRead) {
            case "Yes, books are awesome!":
                await vampireDave.say("Yes, I thought you might");
                await AE.waitForClick(dialogBox);
                await vampireDave.say("What kind of books do you like to read?");
                let fictionOrNo = await d.presentOptions(["Fiction", "Non-fiction"]);
                if (fictionOrNo === "Fiction") {
                    await d.writeText("I am a fan of fiction myself");
                } else {
                    await d.writeText("I see, well I generally prefer fiction myself");
                }
                break;
            case "Books are for losers":
                await vampireDave.say("Yeah? well maybe books think that you're a loser...");
                break;
            default:
                await vampireDave.say("Oh, well that's ok...");
        }

        await AE.waitForClick(d);
        let pt = await gs.get("second_area.princess_talk");
        if (!pt) {
            await vampireDave.say("You should head outside to the left and talk to the princess.");
        } else {
            await this.events.princessShowsUp();
        }

        await AE.waitForClick(dialogBox);
        await d.hideDialog();
        await AniEvents.fadeOut(vampire, 1);

    }

    events = {
        vampireIntro: async (d: DialogComponent, vampire: GameObject, gs: GameState) => {
            let vampireDave = <CharacterComponent>vampire.components['character'];
            await AE.pause(1000);
            await AniEvents.fadeIn(vampire, 1);
            let princessTalk = await gs.get("second_area.princess_talk");
            if (princessTalk === "true") {
                await vampireDave.say("I see you talked to the princess");
            } else {
                await vampireDave.say("Hello, I am a vampire. Welcome to my study.", true);
                await AE.waitForClick(d);
                await vampireDave.showPortrait('handsup');
                await vampireDave.say("As you can see, I have many books", true);
                await AE.pause(100);
                await vampireDave.say(", and not just any books...", false);
                await AE.pause(250);
                await vampireDave.showPortrait('default');
                await vampireDave.say(" good books.", false);
            }
        },
        princessShowsUp: async () => {
            let princess = this.princess;
            let vampire = this.vampire;

            await AniEvents.fadeIn(princess.element, 1);
            let cabbages = await this.gameState.get("second_area.cabbages");
            await princess.say("Hey Dave, some weirdo just told me I look like I could carry " +
                (cabbages === "One" ? "only one cabbage" : cabbages.toLowerCase() + " cabbages") + "..." );
            await AE.waitForClick(this.dialog);
            await princess.say("oh wait! that's them right there.");
            await AE.waitForClick(this.dialog);
            await vampire.showPortrait("handsup");
            await vampire.say("well what do you want me to do about it?");
        }
    };



    loadResources() {
        return new Promise(resolve => {
            ResourceLoader.loadImagesToMap(new Map([
                ["background", "office.png"],
                ["vamp_default", "vamp_look_straight.png"],
                ["vamp_handsup", "test.png"],
                ["princess_default", "princess.png"]
            ]))
                .then(imgs => {
                    resolve();
                    this.buildScene(imgs)
                });

        });
    }
}



export default StartArea;