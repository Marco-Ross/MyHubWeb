export interface IResetPasswordComplete
{
    UserId: string | null,
    Password: string;
    ResetPasswordToken: string | null;
}