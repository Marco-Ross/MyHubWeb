export interface IFeedbackResponse
{
    userFeedback: Feedback[];
}

export class FeedbackPost
{
    public description: string;

    constructor(description: string)
    {
        this.description = description;
    }
}

export class Feedback
{
    public id: string;
    public userId: string;
    public username: string;
    public description: string;
    public createdDate: string;
    public profileImage: string = 'assets/icons/user-thin.png';

    constructor(id: string, userId: string, username: string, description: string, createdDate: string)
    {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.description = description;
        this.createdDate = createdDate;
    }
}