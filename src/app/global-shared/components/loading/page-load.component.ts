import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-load',
    templateUrl: 'page-load.component.html',
    styleUrls: ['page-load.component.scss']
})
export class PageLoadComponent
{
    constructor() { }

    //

    @Input() fontSize = '1.5em';

    ngOnInit()
    {

    }

    //////

}