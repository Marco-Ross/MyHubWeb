export class WorkItem
{
    public state: string | null;
    public stateList: any[] | null;

    constructor(state: string | null, stateList: any[] | null)
    {
        this.state = state;
        this.stateList = stateList;
    }
}