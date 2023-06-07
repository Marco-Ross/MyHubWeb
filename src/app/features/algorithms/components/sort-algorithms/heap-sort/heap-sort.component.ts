import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'heap-sort',
    templateUrl: 'heap-sort.component.html',
    styleUrls: ['heap-sort.component.scss']
})
export class HeapSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    heapSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    `;

    ngOnInit()
    {
        this.heapSortFG = this.formBuilder.group({
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
