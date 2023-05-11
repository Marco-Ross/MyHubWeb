import { Injectable } from '@angular/core';
import { SignalRService } from '../../../global-shared/services/signalR/signalR.service';
import { HubIds } from '../../../global-shared/services/signalR/models/constants/hub.constant';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HomeHub } from '../../../global-shared/services/signalR/models/classes/home-hub.model';

@Injectable({
    providedIn: 'root'
})
export class SignalRHomeService extends SignalRService
{
    constructor()
    {
        super(new HomeHub(HubIds.UpdatedWorkItem, new BehaviorSubject<any>(undefined)));
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