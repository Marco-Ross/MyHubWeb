import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    providers: []
})
export class HomeComponent
{
    constructor() { }

    homeFG!: FormGroup;

    ngOnInit(){
        
    }

}