import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    providers: []
})
export class DashboardComponent
{
    constructor(private router: Router) { }

    Dash2()
    {
        this.router.navigate(['home/dashboard2']);
    }
}