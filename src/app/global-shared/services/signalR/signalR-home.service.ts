import { Injectable } from '@angular/core';
import { SignalRService } from './signalR.service';
import { HubIds } from './models/constants/hub.constant';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HomeHub } from './models/classes/home-hub.model';

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
        this.connect('https://localhost/AzureWorkItemsHub');

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