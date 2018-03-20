class ResourceLoader {
    static loadImage(url: string): Promise<HTMLImageElement> {
        let img = new Image();

        return new Promise<HTMLImageElement>((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject;
            img.src = url;
        });
    }

    private static async loadNamedImage(name: string, url: string): Promise<[string, HTMLImageElement]> {
        let img = await this.loadImage(url);
        return [name, img];
    }

    static loadImages(... urls: string[]): Promise<HTMLImageElement[]> {
        return Promise.all(urls.map(url => this.loadImage(url)));
    }

    static async loadImagesToMap(urls: [string, string][]): Promise<Map<string, HTMLImageElement>> {
        let imageMap = new Map<string, HTMLImageElement>();
        let promises: Promise<[string, HTMLImageElement]>[] = [];
        urls.forEach(((urlSet) => {
            promises.push(this.loadNamedImage(urlSet[0], urlSet[1]));
        }));
        let images = await Promise.all(promises);
        images.forEach(i => imageMap.set(i[0], i[1]));
        return imageMap;
    }
}

export default ResourceLoader;