import { Component, Input } from '@angular/core';

@Component({
    selector: 'work-item-description',
    templateUrl: 'work-item-description.component.html',
    styleUrls:['work-item-description.component.scss'],
    providers: []
})
export class WorkItemDescriptionComponent
{
    constructor() { }

    @Input() selectedWorkItem: any;

    public GetItemDescription()
    {
        if (!this.selectedWorkItem?.fields?.description)
            return 'A description has not been provided.';

        return this.selectedWorkItem?.fields?.description;
    }
}