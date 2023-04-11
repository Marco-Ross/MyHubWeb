import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    providers: [HomeService]
})

export class HomeComponent
{
    constructor(private homeService: HomeService) { }

    faExternalLink = faExternalLink;

    //

    private readonly STATES = {
        Doing: 'Doing',
        ToDo: 'To Do',
        Done: 'Done'
    };
    workItems: any = [];
    selectedWorkItem: any;

    ngOnInit()
    {
        this.homeService.GetAllWorkItems().subscribe({
            next: (workItemsQuery) =>
            {
                let states = this.groupBy(workItemsQuery.workItems, item => item.fields.state);

                for (let k in states)
                    states[k].sort((x: any, y: any) => new Date(y.fields.changedDate).getTime() - new Date(x.fields.changedDate).getTime());

                if (states[this.STATES.Doing])
                    this.workItems = this.workItems.concat(states[this.STATES.Doing]);
                if (states[this.STATES.ToDo])
                    this.workItems = this.workItems.concat(states[this.STATES.ToDo]);
                if (states[this.STATES.Done])
                    this.workItems = this.workItems.concat(states[this.STATES.Done]);
            }
        });
    }

    groupBy<T, K extends keyof any>(arr: T[], key: (i: any) => K)
    {
        return arr.reduce((groups, item) =>
        {
            (groups[key(item)] ||= []).push(item);
            return groups;
        }, {} as Record<K, T[]>);
    }

    getItemDescription()
    {
        if (!this.selectedWorkItem)
            return 'Select a work item on the left to view it\'s details.';

        if (!this.selectedWorkItem?.fields?.description)
            return 'A description has not been provided.';

        return this.selectedWorkItem?.fields?.description;
    }
}