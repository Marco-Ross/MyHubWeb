import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'insertion-sort',
    templateUrl: 'insertion-sort.component.html',
    styleUrls: ['insertion-sort.component.scss']
})
export class InsertionSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    insertionSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    `;

    ngOnInit()
    {
        this.insertionSortFG = this.formBuilder.group({
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
