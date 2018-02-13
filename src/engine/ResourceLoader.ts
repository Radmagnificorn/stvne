class ResourceLoader {
    static loadImage(url: string): Promise<HTMLImageElement> {
        let img = new Image();

        return new Promise<HTMLImageElement>((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject;
            img.src = url;
        });

    }

    static loadImages(... urls: string[]): Promise<HTMLImageElement[]> {
        return Promise.all(urls.map(url => this.loadImage(url)));
    }
}

export default ResourceLoader;