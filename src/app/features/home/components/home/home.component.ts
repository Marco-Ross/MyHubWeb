import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { faExternalLink, faCalendar, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, timer } from 'rxjs';
import { WorkItem } from './models/classes/work-item.class';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    providers: [HomeService]
})

export class HomeComponent
{
    constructor(private homeService: HomeService, private formBuilder: FormBuilder) { }

    faExternalLink = faExternalLink;
    faCalendar = faCalendar;
    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;

    //

    homeFG!: FormGroup;
    private readonly STATES = {
        Doing: 'Doing',
        ToDo: 'To Do',
        Done: 'Done'
    };
    workItems: any = undefined;
    filteredWorkItems: any = undefined;
    selectedWorkItem: any;
    isCollapsed: boolean[] = [];

    ngOnInit()
    {
        this.homeFG = this.formBuilder.group({
            search: ''
        });

        this.homeService.GetAllWorkItems().subscribe({
            next: (workItemsQuery) => this.SetWorkItems(workItemsQuery),
            error: () =>
            {
                this.workItems = [];
                this.filteredWorkItems = [];
            }
        });

        this.homeFG.get('search')?.valueChanges.pipe(debounce(() => timer(500))).subscribe((searchValue) => this.OnSearchChange(searchValue));
    }

    private SetWorkItems(workItemsQuery: any)
    {
        this.workItems = [];
        this.filteredWorkItems = [];

        if (!workItemsQuery || !workItemsQuery.workItems || !workItemsQuery.workItems.length)
            return;

        let states = this.GroupBy(workItemsQuery.workItems, item => item.fields.state);

        this.SortAndEdit(states);

        this.AssignWorkItemValues(states);

        this.AssignFilterValues();
    }

    private AssignWorkItemValues(states: any)
    {
        this.workItems[0] = new WorkItem(this.STATES.Doing, states[this.STATES.Doing]?.length ? states[this.STATES.Doing] : []);
        this.workItems[1] = new WorkItem(this.STATES.ToDo, states[this.STATES.ToDo]?.length ? states[this.STATES.ToDo] : []);
        this.workItems[2] = new WorkItem(this.STATES.Done, states[this.STATES.Done]?.length ? states[this.STATES.Done] : []);
    }

    private AssignFilterValues()
    {
        this.workItems.forEach((item: any, i: any) =>
        {
            this.filteredWorkItems[i] = Object.assign({}, item);
        });
    }

    private GroupBy<T, K extends keyof any>(arr: T[], key: (i: any) => K)
    {
        return arr.reduce((groups, item: any) =>
        {
            (groups[key(item)] ||= []).push(item);
            return groups;
        }, {} as Record<K, T[]>);
    }

    private SortAndEdit(states: Record<any, unknown[]>)
    {
        for (let k in states)
            states[k].sort((x: any, y: any) => new Date(y.fields.changedDate).getTime() - new Date(x.fields.changedDate).getTime());

        for (let i in states)
        {
            states[i].forEach((state: any) =>
            {
                state.fields.changedDate = new Date(new Date(state.fields.changedDate).toDateString()).toISOString();
                state.fields.createdDate = new Date(new Date(state.fields.createdDate).toDateString()).toISOString();
            });
        }
    }

    private OnSearchChange(searchValue: any)
    {
        if (!this.workItems.length)
            return this.filteredWorkItems = [];

        if (!searchValue)
            return this.AssignFilterValues();

        this.SearchWorkItems(searchValue);
    }

    private SearchWorkItems(searchValue: any)
    {
        for (let state of this.workItems)
            this.filteredWorkItems.find((x: any) => x.state == state.state).stateList = state.stateList.filter((item: any) => 
            {
                return this.CheckMatchingFields(item, searchValue);
            });
    }

    private CheckMatchingFields(item: any, searchValue: any)
    {
        for (let field in item.fields)
        {
            if (field.toLowerCase() == 'description')
                return false;

            if (typeof searchValue === "object" && (field.toLowerCase() == 'changeddate' || field.toLowerCase() == 'createddate'))
            {
                let searchDate = new Date(`${searchValue.year} ${searchValue.month} ${searchValue.day}`).toDateString();

                if (new Date(item.fields[field]).toDateString().includes(searchDate))
                    return true;
            }

            if (typeof searchValue === "string" && field.toLowerCase() == 'id')
            {
                if (('hub-' + item.fields[field].toString().toLowerCase()).includes(searchValue.toLowerCase()))
                    return true;
            }

            if (typeof searchValue === "string" && item.fields[field].toString().toLowerCase().includes(searchValue.toLowerCase()))
                return true;
        }

        return false;
    }

    public GetItemDescription()
    {
        if (!this.selectedWorkItem)
            return 'Select a work item on the left to view it\'s details.';

        if (!this.selectedWorkItem?.fields?.description)
            return 'A description has not been provided.';

        return this.selectedWorkItem?.fields?.description;
    }

    public IsEmpty(items: any)
    {
        return items.every((state: any) =>
        {
            return state.stateList.length === 0;
        });
    }
}