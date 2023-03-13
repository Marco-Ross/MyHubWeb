export class ButtonService
{
    public loading: boolean = false;
    private loadingTimeout!: ReturnType<typeof setTimeout>;

    StartLoading(debounce: number)
    {
        this.loadingTimeout = setTimeout(() =>
        {
            this.loading = true;
        }, debounce);
        return true;
    }

    StopLoading()
    {
        clearTimeout(this.loadingTimeout);
        this.loading = false;
        return false;
    }
}