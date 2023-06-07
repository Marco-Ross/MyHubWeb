import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'radix-sort',
    templateUrl: 'radix-sort.component.html',
    styleUrls: ['radix-sort.component.scss']
})
export class RadixSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    radixSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    `;

    ngOnInit()
    {
        this.radixSortFG = this.formBuilder.group({
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
