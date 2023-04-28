import { IHub } from './models/interfaces/hub.interface';
import * as signalR from '@microsoft/signalr';

export abstract class SignalRService
{
    constructor(hub: IHub)
    {
        this.hub = hub;
        this.onUpdate = this.onUpdate.bind(this);
    }

    hub!: IHub;
    public connetion!: signalR.HubConnection;
    protected registeredHubs: Array<IHub> = new Array<IHub>();

    protected abstract subscribe(next: () => any): void;
    protected abstract unsubscribe(): void;

    protected connect(connectionUri: string)
    {
        this.connetion = new signalR.HubConnectionBuilder().withUrl(connectionUri).build();

        this.connetion.start().then(() => console.log('ConnectionS Started')).catch(err => console.log('Error on connection start: ' + err));

        this.registerHubListener();
    }

    protected disconnect()
    {
        this.deregisterHubListener();
        this.connetion.stop();
    }

    protected registerHubListener()
    {
        if (!this.hub || this.registeredHubs.find(x => x.id === this.hub?.id))
            return;

        this.registeredHubs.push(this.hub);

        this.connetion.on(this.hub.id, this.onUpdate);
    }

    protected deregisterHubListener()
    {
        if (!this.hub || this.registeredHubs.find(x => x.id !== this.hub?.id))
            return;

        this.registeredHubs.splice(this.registeredHubs.findIndex(hub => hub.id === this.hub.id), 1);

        this.connetion.off(this.hub.id, this.onUpdate);
    }

    protected onUpdate(data: any)
    {
        this.hub.subject.next(data);
    }
}