import { ILikedUser } from "./gallery-image.interface";

export class likedUser implements ILikedUser
{
    id: string;
    username: string;

    constructor(id: string, username: string)
    {
        this.id = id;
        this.username = username;
    }
}