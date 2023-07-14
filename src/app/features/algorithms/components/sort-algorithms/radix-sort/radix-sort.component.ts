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
    static int getMax(int[] a, int n) {  
        int max = a[0];  
        for(int i = 1; i<n; i++) {  
            if(a[i] > max)  
                max = a[i];  
        }  
        return max; //maximum element from the array  
    }
       
    static void countingSort(int[] a, int n, int place) // function to implement counting sort  
    {  
        int[] output = new int[n+1];  
        int[] count = new int[10];  
        
        // Calculate count of elements  
        for (int i = 0; i < n; i++)  
            count[(a[i] / place) % 10]++;  
            
        // Calculate cumulative frequency  
        for (int i = 1; i < 10; i++)  
            count[i] += count[i - 1];  
        
        // Place the elements in sorted order  
        for (int i = n - 1; i >= 0; i--) {  
            output[count[(a[i] / place) % 10] - 1] = a[i];  
            count[(a[i] / place) % 10]--;  
        }  
        
        for (int i = 0; i < n; i++)  
            a[i] = output[i];  
    }  
        
    // function to implement radix sort  
    static void radixsort(int[] a, int n) {  
        // get maximum element from array  
        int max = getMax(a, n);  
        
        // Apply counting sort to sort elements based on place value  
        for (int place = 1; max / place > 0; place *= 10)  
            countingSort(a, n, place);  
    }
    
    // function to print array elements  
    static void printArray(int[] a, int n) {  
        for (int i = 0; i < n; ++i)   
            Console.Write(a[i] + " ");  
    }  
       
    static void Main() {  
       int[] a = {161, 269, 370, 101, 125, 716, 54, 868, 12};  
       int n = a.Length;  
       Console.WriteLine("Before sorting array elements are:");  
       printArray(a,n);  
       Console.WriteLine();
       radixsort(a, n);  
       Console.WriteLine("After applying Radix sort, the array elements are:");  
       printArray(a, n);  
     }  

    
    Output:
       Before sorting array elements are: 
        "161 269 370 101 125 716 54 868 12"
        
        After sorting array elements are: 
        "12 54 101 125 161 269 370 716 868"`;

    ngOnInit()
    {
        this.radixSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    radixSortExecute()
    {
        this.radixSort(countries, countries.length);
    }

    private getMax(a: Country[], n: number): number
    {
        let max = a[0].id;
        for (let i = 1; i < n; i++)
        {
            if (a[i].id > max)
                max = a[i].id;
        }
        return max;
    }

    private countingSort(a: Country[], n: number, place: number): void
    {
        let output: Country[] = new Array(n + 1).fill(0);
        let count: number[] = new Array(10).fill(0);

        for (let i = 0; i < n; i++)
            count[Math.floor(a[i].id / place) % 10]++;

        for (let i = 1; i < 10; i++)
            count[i] += count[i - 1];

        for (let i = n - 1; i >= 0; i--)
        {
            output[count[Math.floor(a[i].id / place) % 10] - 1] = a[i];
            count[Math.floor(a[i].id / place) % 10]--;
        }

        for (let i = 0; i < n; i++)
            a[i] = output[i];
    }

    private radixSort(a: Country[], n: number): void
    {
        let max = this.getMax(a, n);

        for (let place = 1; Math.floor(max / place) > 0; place *= 10)
            this.countingSort(a, n, place);
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
