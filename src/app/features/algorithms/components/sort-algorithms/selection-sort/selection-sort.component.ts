import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'selection-sort',
    templateUrl: 'selection-sort.component.html',
    styleUrls: ['selection-sort.component.scss']
})
export class SelectionSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    selectionSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    static void sort(int []arr)
    {
        int n = arr.Length;
 
        // One by one move boundary of unsorted subarray
        for (int i = 0; i < n - 1; i++)
        {
            // Find the minimum element in unsorted array
            int min_idx = i;
            for (int j = i + 1; j < n; j++)
                if (arr[j] < arr[min_idx])
                    min_idx = j;
 
            // Swap the found minimum element with the first
            // element
            int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }
 
    // Prints the array
    static void printArray(int []arr)
    {
        int n = arr.Length;
        for (int i=0; i<n; ++i)
            Console.Write(arr[i]+" ");
        Console.WriteLine();
    }
 
    // Driver code
    public static void Main()
    {
        int []arr = {64,25,12,22,11};
        sort(arr);
        Console.WriteLine("Sorted array");
        printArray(arr);
    }
    

    Output:
        Sorted array: 
        "11 12 22 25 64"`;

    ngOnInit()
    {
        this.selectionSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    selectionSort()
    {
        let n = countries.length;

        for (let i = 0; i < n - 1; i++)
        {
            let min_idx = i;
            for (let j = i + 1; j < n; j++)
                if (countries[j].id < countries[min_idx].id)
                    min_idx = j;

            let temp = countries[min_idx];
            countries[min_idx] = countries[i];
            countries[i] = temp;
        }
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
