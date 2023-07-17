import { Injectable } from '@angular/core';
import { SignalRService } from '../../../global-shared/services/signalR/signalR.service';
import { HubIds } from '../../../global-shared/services/signalR/models/constants/hub.constant';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WorkBoardHub } from '../../../global-shared/services/signalR/models/classes/work-board-hub.model';

@Injectable({
    providedIn: 'root'
})
export class SignalRWorkBoardService extends SignalRService
{
    constructor()
    {
        super(new WorkBoardHub(HubIds.UpdatedWorkItem, new BehaviorSubject<any>(undefined)));
    }

    hubSubscription!: Subscription;

    public override subscribe(callback: (onUpdate: any)=> void): void
    {
        this.connect('AzureWorkItemsHub');

        this.hubSubscription = this.hub.subject.subscribe({
            next: callback
        });
    }
    
    public override unsubscribe(): void
    {
        this.disconnect();

        this.hubSubscription.unsubscribe();    
    }
}