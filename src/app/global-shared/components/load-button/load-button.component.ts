import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
    selector: 'load-button',
    templateUrl: 'load-button.component.html',
    providers: []
})
export class LoadButtonComponent
{
    @Input() buttonText: string = '';
    @Input() disabled: boolean = false;
    @Input() isLoading: boolean = false;
    @Input() type: string = 'button';
    @Input() debounce: number = 0;

    loading: boolean = false;
    private loadingTimeout!: ReturnType<typeof setTimeout>;

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes['isLoading'].currentValue)
            this.StartLoading();
        else if (!changes['isLoading'].currentValue)
            this.StopLoading();
    }

    StartLoading()
    {
        if (!this.isLoading)
            return;
            
        this.loadingTimeout = setTimeout(() =>
        {
            this.loading = true;
        }, this.debounce);
        return true;
    }

    StopLoading()
    {
        clearTimeout(this.loadingTimeout);
        this.loading = false;
        return false;
    }
}