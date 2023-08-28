import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback, FeedbackPost, IFeedbackResponse } from './classes/feedback.class';

@Injectable()
export class FeedbackService
{
    private readonly ApiController: string = 'Feedback';

    constructor(private http: HttpClient) { }

    postFeedback(feedback: FeedbackPost): Observable<any>
    {
        return this.http.post(this.ApiController, feedback);
    }

    getFeedback(): Observable<IFeedbackResponse>
    {
        return this.http.get<IFeedbackResponse>(this.ApiController);
    }

    deleteFeedback(id: string): Observable<any>
    {
        return this.http.delete(this.ApiController + '/' + id);
    }
}