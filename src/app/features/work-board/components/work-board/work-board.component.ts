import { Component } from '@angular/core';
import { faExternalLink, faCaretDown, faCaretUp, faRefresh, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, filter, timer } from 'rxjs';
import { WorkItem } from './models/classes/work-item.class';
import { NavigationStart, Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignalRWorkBoardService } from '../../services/signalR-work-board.service';
import { WorkBoardService } from './work-board.service';

@Component({
    selector: 'work-board',
    templateUrl: 'work-board.component.html',
    styleUrls: ['work-board.component.scss'],
    providers: [WorkBoardService]
})

export class WorkBoardComponent
{
    constructor(private workBoardService: WorkBoardService, private formBuilder: FormBuilder, private signalRWorkBoardService: SignalRWorkBoardService, private router: Router, private modalService: NgbModal,
        private calendar: NgbCalendar) 
    {
        this.fromDate = calendar.getToday();
        // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    faExternalLink = faExternalLink;
    faCaretDown = faCaretDown;
    faCaretUp = faCaretUp;
    faRefresh = faRefresh;
    faCircle = faCircle;

    //

    workBoardFG!: FormGroup;
    private readonly STATES = {
        Doing: 'Doing',
        ToDo: 'To Do',
        Done: 'Done'
    };
    workItems: any = undefined;
    filteredWorkItems: any = undefined;
    selectedWorkItem: any;
    isCollapsed: boolean[] = [];
    hoveredDate: NgbDate | null = null;
    fromDate: NgbDate;
    toDate: NgbDate | null = null;
    searchText: string = '';

    ngOnInit()
    {
        this.workBoardFG = this.formBuilder.group({
            search: ''
        });

        this.initializeWorkBoardHub();

        this.workBoardService.GetAllWorkItems().subscribe({
            next: (workItemsQuery) => this.SetWorkItems(workItemsQuery),
            error: () =>
            {
                this.workItems = [];
                this.filteredWorkItems = [];
            }
        });

        this.workBoardFG.get('search')?.valueChanges.pipe(debounce(() => timer(500)))
            .subscribe((searchValue) => this.applyFilter(searchValue));
    }

    onDateSelection(date: NgbDate)
    {
        if (!this.fromDate && !this.toDate)
            this.fromDate = date;

        else if (this.fromDate && !this.toDate && date.after(this.fromDate))
        {
            this.toDate = date;

            this.applyFilter(this.workBoardFG.get('search')?.value);
        }
        else
        {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    private filterDates()
    {
        if (!this.toDate)
            return;

        for (let state of this.workItems)
            this.filteredWorkItems.find((x: any) => x.state == state.state).stateList = state.stateList.filter((item: any) =>
            {
                for (let field in item.fields)
                {
                    if (field.toLowerCase() == 'changeddate' || field.toLowerCase() == 'createddate')
                    {
                        let from = new Date(`${this.fromDate.year} ${this.fromDate.month} ${this.fromDate.day}`);
                        let to = new Date(`${this.toDate?.year} ${this.toDate?.month} ${this.toDate?.day}`);

                        if (new Date(item.fields[field]) >= from && new Date(item.fields[field]) <= to)
                            return true;

                        else
                            return false;
                    }
                }

                return false;
            });
    }

    resetDates()
    {
        this.fromDate = this.calendar.getToday();
        this.toDate = null;

        this.AssignFilterValues();
        this.applyFilter(this.workBoardFG.get('search')?.value);
    }

    isHovered(date: NgbDate)
    {
        return (
            this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
        );
    }

    isInside(date: NgbDate)
    {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate)
    {
        return (
            date.equals(this.fromDate) ||
            (this.toDate && date.equals(this.toDate)) ||
            this.isInside(date) ||
            this.isHovered(date)
        );
    }

    private initializeWorkBoardHub()
    {
        this.onWorkItemUpdate();
        this.hubCleanup();
    }

    private hubCleanup()
    {
        let navigateSub = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe({
            next: () =>
            {
                this.signalRWorkBoardService.unsubscribe();
                navigateSub.unsubscribe();
            }
        });
    }

    private onWorkItemUpdate()
    {
        this.signalRWorkBoardService.subscribe(
            updatedWorkItem =>
            {
                if (!updatedWorkItem || !this.workItems?.length)
                    return;

                let workItemsQuery = {
                    workItems: this.setUpdatedFields(updatedWorkItem)
                };

                this.SetWorkItems(workItemsQuery);
            }
        );
    }

    private setUpdatedFields(updatedWorkItem: any)
    {
        let flattenedWorkItems = this.workItems.map((x: any) => x.stateList).flat(1);

        let updatedWorkItemIndex = flattenedWorkItems.findIndex((x: any) => x.id === updatedWorkItem.resource.workItemId);

        if (updatedWorkItemIndex < 0)
            return flattenedWorkItems;

        Object.keys(updatedWorkItem.resource.fields).forEach(key =>
        {
            let updateKey = Object.keys(flattenedWorkItems[updatedWorkItemIndex].fields).find(x => `system.${x}` === key.toLowerCase());

            if (updateKey)
                flattenedWorkItems[updatedWorkItemIndex].fields[updateKey] = updatedWorkItem.resource.fields[key].newValue;
        });

        return flattenedWorkItems;
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

        this.selectedWorkItem = this.filteredWorkItems[0].stateList[0];
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
        {
            this.filteredWorkItems = [];
            return;
        }

        this.SearchWorkItems(searchValue);
    }

    private SearchWorkItems(searchValue: any)
    {
        for (let state of this.filteredWorkItems)
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

    public IsEmpty(items: any)
    {
        return items.every((state: any) =>
        {
            return state.stateList.length === 0;
        });
    }

    public GetItemDescription()
    {
        if (!this.selectedWorkItem?.fields?.description)
            return 'A description has not been provided.';

        return this.selectedWorkItem?.fields?.description;
    }

    open(content: any)
    {
        this.modalService.open(content, { centered: true });
    }

    applyFilter(searchValue: string)
    {
        if (!searchValue)
            this.AssignFilterValues();

        this.filterDates();
        this.OnSearchChange(searchValue);
    }
}