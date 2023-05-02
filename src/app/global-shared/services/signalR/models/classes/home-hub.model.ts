import { BehaviorSubject } from "rxjs";
import { IHub } from "../interfaces/hub.interface";

export class HomeHub implements IHub
{
    public id: string;
    public subject: BehaviorSubject<any>;

    constructor(id: string, subject: BehaviorSubject<any>)
    {
        this.id = id;
        this.subject = subject;
    }
}