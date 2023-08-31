import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.scss']
})
export class AboutComponent
{
    constructor(private formBuilder: FormBuilder) { }

    faEnvelope = faEnvelope;

    //

    aboutFG!: FormGroup;
    copyText: string = 'Copy email';
    autoClose = false;

    ngOnInit()
    {
        this.aboutFG = this.formBuilder.group({
        });
    }

    //////

    copyEmail()
    {
        this.copyText = 'Email Copied';
    }

    revertEmail()
    {
        setTimeout(() =>
        {
            this.copyText = 'Copy email';
        }, 200);
    }
}