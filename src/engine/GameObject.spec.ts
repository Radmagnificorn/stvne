import GameObject, {ImageMode} from './GameObject';
import Game from "./Game";

describe("GameObject", () => {

    it("should return the percent size offset of it's image", () => {

        let img = new Image(100, 100);
        let go = new GameObject(0,0, 75, 50, img);
        go.imageMode = ImageMode.CLIP;

        expect(go.width).toBe(50);
        expect(go.image.width).toBe(100);
        expect(go.imgScale.width).toBe(0.5);
        expect(go.imgScale.height).toBe(0.75);

    });

    it("should resize to match it's image when mode is set to WrapImage", () => {
        let img = new Image(100, 100);
        let go = new GameObject(0,0, 75, 50, img);
        go.imageMode = ImageMode.WRAP_IMAGE;

        expect(go.width).toBe(100);
        expect(go.height).toBe(100);
    });

    it("with ImageMode.MAINTAIN_ASPECT_BY_HEIGHT, should adjust the width to maintain aspect ratio", () => {
        let img = new Image(50, 100);
        let go = new GameObject(0,0, 100, 0, img);
        go.imageMode = ImageMode.MAINTAIN_ASPECT_BY_HEIGHT;

        expect(go.width).toBe(50);

        go.height = 200;

        expect(go.width).toBe(100);

    });

    it("with ImageMode.MAINTAIN_ASPECT_BY_WIDTH, should adjust the height to maintain aspect ratio", () => {
        let img = new Image(50, 100);
        let go = new GameObject(0,0, 0, 50, img);
        go.imageMode = ImageMode.MAINTAIN_ASPECT_BY_WIDTH;

        expect(go.height).toBe(100);

        go.width = 200;

        expect(go.height).toBe(400);

    });
});