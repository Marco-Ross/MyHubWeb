export class ChangeEmail
{
    public Email: string | null;
    public AccessToken: string | null;

    constructor(email: string | null, accessToken: string | null)
    {
        this.Email = email;
        this.AccessToken = accessToken;
    }
}