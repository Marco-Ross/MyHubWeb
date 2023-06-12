import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'shell-sort',
    templateUrl: 'shell-sort.component.html',
    styleUrls: ['shell-sort.component.scss']
})
export class ShellSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    shellSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    `;

    ngOnInit()
    {
        this.shellSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;
    }

    //////

    bubbleSort()
    {
        
    }

    reset()
    {
        this.countries = countries;
    }
}
