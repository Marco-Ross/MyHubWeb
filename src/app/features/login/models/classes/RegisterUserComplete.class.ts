import { IRegisterUserComplete } from "../interfaces/IRegisterUserComplete.interface";

export class RegisterUserComplete implements IRegisterUserComplete
{
    public UserId: string | null;
    public RegisterToken: string | null;

    constructor(userId: string | null, registerToken: string | null)
    {
        this.UserId = userId;
        this.RegisterToken = registerToken;
    }
}