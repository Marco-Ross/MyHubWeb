export class GoogleAccessOptions
{
    public authuser: string;
    public code: string;
    public prompt: string;
    public scope: string;
    public state: string;

    constructor(authuser: string, code: string, prompt: string, scope: string, state: string)
    {
        this.authuser = authuser;
        this.code = code;
        this.prompt = prompt;
        this.scope = scope;
        this.state = state;
    }
}