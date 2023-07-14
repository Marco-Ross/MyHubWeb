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
    static void printArray(int []arr)
    {
        int n = arr.Length;
        for (int i=0; i<n; ++i)
        Console.Write(arr[i] + " ");
        Console.WriteLine();
    }
  
    /* function to sort arr using shellSort */
    int sort(int []arr)
    {
        int n = arr.Length;
  
        // Start with a big gap, 
        // then reduce the gap
        for (int gap = n/2; gap > 0; gap /= 2)
        {
            // Do a gapped insertion sort for this gap size.
            // The first gap elements a[0..gap-1] are already
            // in gapped order keep adding one more element
            // until the entire array is gap sorted
            for (int i = gap; i < n; i += 1)
            {
                // add a[i] to the elements that have
                // been gap sorted save a[i] in temp and
                // make a hole at position i
                int temp = arr[i];
  
                // shift earlier gap-sorted elements up until
                // the correct location for a[i] is found
                int j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                    arr[j] = arr[j - gap];
  
                // put temp (the original a[i]) 
                // in its correct location
                arr[j] = temp;
            }
        }
        return 0;
    }
    
    public static void Main()
    {
        int []arr = {12, 34, 54, 2, 3};
        Console.WriteLine("Array before sorting: ");
        printArray(arr);
  
        sort(arr);
  
        Console.WriteLine("Array after sorting: ");
        printArray(arr);
    }

    
    Output:
        Sorted array: 
        "2 3 12 34 54"`;

    ngOnInit()
    {
        this.shellSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    shellSort()
    {
        this.sort(countries);
    }

    private sort(arr: Country[]): number 
    {
        let n = arr.length;

        for (let gap = n / 2; gap > 0; gap /= 2)
        {
            gap = Math.floor(gap);
            for (let i = gap; i < n; i += 1)
            {
                let temp = arr[i];

                let j;
                for (j = i; j >= gap && arr[j - gap].id > temp.id; j -= gap)
                    arr[j] = arr[j - gap];

                arr[j] = temp;
            }
        }

        return 0;
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
