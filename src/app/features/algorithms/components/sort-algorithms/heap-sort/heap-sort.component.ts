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
    public void sort(int[] arr)
    {
        int N = arr.Length;

        // Build heap (rearrange array)
        for (int i = N / 2 - 1; i >= 0; i--)
            heapify(arr, N, i);

        // One by one extract an element from heap
        for (int i = N - 1; i > 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }

    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
    void heapify(int[] arr, int N, int i)
    {
        int largest = i; // Initialize largest as root
        int l = 2 * i + 1; // left = 2*i + 1
        int r = 2 * i + 2; // right = 2*i + 2

        // If left child is larger than root
        if (l < N && arr[l] > arr[largest])
            largest = l;

        // If right child is larger than largest so far
        if (r < N && arr[r] > arr[largest])
            largest = r;

        // If largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify the affected sub-tree
            heapify(arr, N, largest);
        }
    }

    /* A utility function to print array of size n */
    static void printArray(int[] arr)
    {
        int N = arr.Length;
        for (int i = 0; i < N; ++i)
            Console.Write(arr[i] + " ");
        Console.Read();
    }

    // Driver's code
    public static void Main()
    {
        int[] arr = { 12, 11, 13, 5, 6, 7 };
        int N = arr.Length;

        // Function call
        HeapSort ob = new HeapSort();
        ob.sort(arr);

        Console.WriteLine("Sorted array is");
        printArray(arr);
    }
    
    
    Output:
        Sorted array: 
        "5 6 7 11 12 13"`;

    ngOnInit()
    {
        this.heapSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    heapSort()
    {
        this.sort(countries);
    }

    private sort(arr: Country[]): void
    {
        let N = arr.length;

        for (let i = N / 2 - 1; i >= 0; i--)
            this.heapify(arr, N, i);

        for (let i = N - 1; i > 0; i--)
        {
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            this.heapify(arr, i, 0);
        }
    }

    private heapify(arr: Country[], N: number, i: number): void
    {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        if (l < N && arr[l].id > arr[largest].id)
            largest = l;

        if (r < N && arr[r].id > arr[largest].id)
            largest = r;

        if (largest != i)
        {
            let swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            this.heapify(arr, N, largest);
        }
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
