import Character from "./Character";
import AreaDialog from "../AreaDialog";
import {ImageMode} from "../GameObject";

describe("Character", () => {

    let character: Character;

    beforeEach(() => {
        character = new Character(0, 0, 100, null, [
            ["default", "default"],
            ["img1", "image1"],
            ["img2", "image2"]
        ]);
    });

    it('should have an image mode of MAINTAIN_ASPECT_BY_HEIGHT', () => {
        expect(character.imageMode).toBe(ImageMode.MAINTAIN_ASPECT_BY_HEIGHT);
    });

});