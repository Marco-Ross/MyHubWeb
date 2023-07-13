export class uploadOptions
{
    title: string;
    buttonText: string = 'Save';
    buttonType: string = 'Submit';
    size: string = 'md';
    windowClass: string = '';
    data: any = {};

    constructor(title: string)
    {
        this.title = title;
    }
}