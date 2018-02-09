class ResourceLoader {
    loadImage(url: string): Promise<HTMLImageElement> {
        let img = new Image();

        return new Promise<HTMLImageElement>((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject;
            img.src = url;
        });

    }
}

export default ResourceLoader;