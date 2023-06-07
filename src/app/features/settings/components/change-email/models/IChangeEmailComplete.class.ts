export class ChangeEmailComplete
{
    public UserId: string | null;
    public ChangeEmailToken: string | null;

    constructor(userId: string | null, changeEmailToken: string | null)
    {
        this.UserId = userId;
        this.ChangeEmailToken = changeEmailToken;
    }
}