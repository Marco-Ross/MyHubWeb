export class galleryImage
{
    image: string | undefined | null;
    caption: string;

    constructor(image: string | undefined | null, caption: string)
    {
        this.image = image;
        this.caption = caption;
    }
}