import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Country, countries } from '../search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'linear-search',
    templateUrl: 'linear-search.component.html',
    styleUrls: ['linear-search.component.scss']
})
export class LinearSearchComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    linearSearchFG!: FormGroup;
    highlightedCode: string = '';
    countries$!: Observable<Country[]> | undefined;
    code =
        `
    static int LinearSearch(int[] numbers, int target)
    {
        for (int i = 0; i < numbers.Length; i++)
        {
            if (numbers[i] == target)
                return i;
        }

        return -1;
    }
     
    // Driver code
    public static void Main()
    {
        int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        int index = LinearSearch(numbers, 5);
        Console.WriteLine("The number 5 is at index " + index);
    }
    
    Output: 
        "The number 5 is at index 4"`;

    ngOnInit()
    {
        this.linearSearchFG = this.formBuilder.group({
            search: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries$ = this.linearSearchFG.get('search')?.valueChanges.pipe(
            startWith(''),
            map((text) => this.linearSearch(text))
        );
    }

    //////

    linearSearch(text: string): Country[]
    {
        const term = text.toLowerCase();
        var matchingCountries = [];

        for (var i = 0; i < countries.length; i++)
        {
            if (
                countries[i].name.toLowerCase().includes(term) ||
                countries[i].capital.toLowerCase().includes(term) ||
                countries[i].population.toString().includes(term)
            )
                matchingCountries.push(countries[i]);
        }

        return matchingCountries;
    }
}
