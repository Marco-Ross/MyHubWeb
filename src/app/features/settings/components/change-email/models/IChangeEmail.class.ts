export class ChangeEmail
{
    public Email: string | null;
    public IdToken: string | null;

    constructor(email: string | null, idToken: string | null)
    {
        this.Email = email;
        this.IdToken = idToken;
    }
}