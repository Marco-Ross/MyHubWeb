export class FacebookAccessOptions
{
    public code: string;
    public state: string;

    constructor(code: string, state: string)
    {
        this.code = code;
        this.state = state;
    }
}