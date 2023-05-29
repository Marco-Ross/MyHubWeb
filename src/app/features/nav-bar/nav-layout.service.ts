import { Injectable } from '@angular/core';
import { NavDetails } from './class/nav-details.class';

@Injectable({ providedIn: 'root' })
export class NavLayoutService
{
    constructor() { }

    private navDetails!: NavDetails;

    setNavDetails(navDetails: NavDetails)
    {
        this.navDetails = navDetails;
    }

    getNavDetails(): NavDetails
    {
        return this.navDetails;
    }
}