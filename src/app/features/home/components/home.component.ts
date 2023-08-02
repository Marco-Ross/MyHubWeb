import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    homeFG!: FormGroup;

    ngOnInit()
    {
        this.homeFG = this.formBuilder.group({});
    }

    //////


}