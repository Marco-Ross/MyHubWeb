import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'counting-sort',
    templateUrl: 'counting-sort.component.html',
    styleUrls: ['counting-sort.component.scss']
})
export class CountingSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    countingSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    `;

    ngOnInit()
    {
        this.countingSortFG = this.formBuilder.group({
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
