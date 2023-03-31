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

    workItems: any = [];

    selectedWorkItem: any;

    ngOnInit()
    {
        this.homeService.GetAllWorkItems().subscribe({
            next: (workItemsQuery) =>
            {
                this.workItems = workItemsQuery.workItems.sort((x: any, y: any) => new Date(y.fields.changedDate).getTime() - new Date(x.fields.changedDate).getTime());
            }
        });
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