import { BehaviorSubject } from "rxjs";

export interface IHub
{
    id: string;
    subject: BehaviorSubject<any>;
}