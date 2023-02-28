import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'load-button',
    templateUrl: 'load-button.component.html',
    styleUrls: ['load-button.component.scss']
})
export class LoadButtonComponent
{
    @Input() name = '';
    @Input() debounce = 0;
    @Input() type = '';
    @Input() subscription = new Subscription;

    constructor() { }

    loading: boolean = false;
    loadingTimeout!: ReturnType<typeof setTimeout>;

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes['subscription'].currentValue)
            this.subscription.add(() =>
            {
                clearTimeout(this.loadingTimeout);
                this.loading = false;
            });
    }

    //////

    public Load()
    {
        this.loadingTimeout = setTimeout(() =>
        {
            this.loading = true;
        }, this.debounce);
    }
}