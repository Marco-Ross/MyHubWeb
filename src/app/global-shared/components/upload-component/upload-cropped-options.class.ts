export class uploadCroppedOptions
{
    title: string;
    resizeToWidth: number;
    useRound: boolean;

    constructor(title: string, resizeToWidth: number, useRound: boolean = false)
    {
        this.title = title;
        this.resizeToWidth = resizeToWidth;
        this.useRound = useRound;
    }
}