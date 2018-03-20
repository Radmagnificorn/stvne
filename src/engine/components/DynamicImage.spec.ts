import DynamicImage from "./DynamicImage";
import GameObject from "../GameObject";

describe("DynamicImage", () => {

    let images: Map<string, HTMLImageElement>;
    const DynImage = DynamicImage(GameObject);

    beforeEach(() => {
        images = new Map<string, HTMLImageElement>();

        let img1 = new Image();
        img1.src = 'default';
        images.set("default", img1);

        let img2 = new Image();
        img2.src = 'image2';
        images.set("img2", img2);

        let img3 = new Image();
        img3.src = 'image3';
        images.set("img3", img3);
    });

    it("should initialize with default if it exists", () => {
        let dynImage = new DynImage();
        dynImage.initDynamicImage(images);
        expect(dynImage.image.src).toBe("default");
    });

    it("should initialize to the first image if nothing is called default", () => {
        let dynImage = new DynImage();
        images.delete("default");
        dynImage.initDynamicImage(images);
        expect(dynImage.image.src).toBe("image2");
    });

    it("should set set the object's image to what is specified", () => {
        let dynImage = new DynImage();
        dynImage.initDynamicImage(images);

        dynImage.showImage("img3");

        expect(dynImage.image.src).toBe("image3");
    });

});