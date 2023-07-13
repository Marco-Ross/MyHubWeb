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
    void sort(int[] arr)
    {
        int n = arr.Length;
        for (int i = 1; i < n; ++i) {
            int key = arr[i];
            int j = i - 1;
 
            // Move elements of arr[0..i-1],
            // that are greater than key,
            // to one position ahead of
            // their current position
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
 
    // A utility function to print
    // array of size n
    static void printArray(int[] arr)
    {
        int n = arr.Length;
        for (int i = 0; i < n; ++i)
            Console.Write(arr[i] + " ");
 
        Console.WriteLine("");
    }
 
    // Driver Code
    public static void Main()
    {
        int[] arr = { 12, 11, 13, 5, 6 };
        sort(arr);
        printArray(arr);
    }
    

    Output:
        Sorted array: 
        "5 6 11 12 13"`;

    ngOnInit()
    {
        this.insertionSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    insertionSort()
    {
        let n = countries.length;
        for (let i = 1; i < n; ++i)
        {
            let key = countries[i];
            let j = i - 1;

            while (j >= 0 && countries[j].id > key.id)
            {
                countries[j + 1] = countries[j];
                j = j - 1;
            }

            countries[j + 1] = key;
        }
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
