import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard2',
    templateUrl: 'dashboard2.component.html',
    providers: []
})
export class DashboardComponent2
{
    constructor(private router: Router) { }

    Dash1()
    {
        this.router.navigate(['home/dashboard']);
    }
}