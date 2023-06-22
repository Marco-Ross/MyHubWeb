export class GoogleAccessOptions
{
    public authuser: string;
    public code: string;
    public prompt: string;
    public scope: string;
    public state: string;
    public nonce: string | null;

    constructor(authuser: string, code: string, prompt: string, scope: string, state: string, nonce: string | null)
    {
        this.authuser = authuser;
        this.code = code;
        this.prompt = prompt;
        this.scope = scope;
        this.state = state;
        this.nonce = nonce;
    }
}