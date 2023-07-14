import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'quick-sort',
    templateUrl: 'quick-sort.component.html',
    styleUrls: ['quick-sort.component.scss']
})
export class QuickSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    quickSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    // A utility function to swap two elements
    static void swap(int[] arr, int i, int j)
    {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
 
    // This function takes last element as pivot,
    // places the pivot element at its correct position
    // in sorted array, and places all smaller to left
    // of pivot and all greater elements to right of pivot
    static int partition(int[] arr, int low, int high)
    {
        // Choosing the pivot
        int pivot = arr[high];
 
        // Index of smaller element and indicates
        // the right position of pivot found so far
        int i = (low - 1);
 
        for (int j = low; j <= high - 1; j++) {
 
            // If current element is smaller than the pivot
            if (arr[j] < pivot) {
 
                // Increment index of smaller element
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return (i + 1);
    }
 
    // The main function that implements QuickSort
    // arr[] --> Array to be sorted,
    // low --> Starting index,
    // high --> Ending index
    static void quickSort(int[] arr, int low, int high)
    {
        if (low < high) {
 
            // pi is partitioning index, arr[p]
            // is now at right place
            int pi = partition(arr, low, high);
 
            // Separately sort elements before
            // and after partition index
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
 
    // Driver Code
    public static void Main()
    {
        int[] arr = { 10, 7, 8, 9, 1, 5 };
        int N = arr.Length;
 
        // Function call
        quickSort(arr, 0, N - 1);
        Console.WriteLine("Sorted array:");
        for (int i = 0; i < N; i++)
            Console.Write(arr[i] + " ");
    }


    Output:
        Sorted array: 
        "1 5 7 8 9 10"`;

    ngOnInit()
    {
        this.quickSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    quickSortExecute()
    {
        this.quickSort(countries, 0, countries.length - 1);
    }

    private quickSort(arr: Country[], low: number, high: number): void
    {
        if (low < high)
        {
            let pi = this.partition(arr, low, high);

            this.quickSort(arr, low, pi - 1);
            this.quickSort(arr, pi + 1, high);
        }
    }

    private swap(arr: Country[], i: number, j: number): void
    {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    private partition(arr: Country[], low: number, high: number): number
    {
        let pivot = arr[high];

        let i = (low - 1);

        for (let j = low; j <= high - 1; j++)
        {
            if (arr[j].id < pivot.id)
            {
                i++;
                this.swap(arr, i, j);
            }
        }
        this.swap(arr, i + 1, high);
        return (i + 1);
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
