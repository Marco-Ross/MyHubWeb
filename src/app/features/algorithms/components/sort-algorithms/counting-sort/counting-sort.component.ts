import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'counting-sort',
    templateUrl: 'counting-sort.component.html',
    styleUrls: ['counting-sort.component.scss']
})
export class CountingSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    countingSortFG!: FormGroup;
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
    
    static void countSort(int[] a, int n) // function to perform counting sort  
    {  
        int[] output = new int [n+1];  
        int max = getMax(a, n);  
        int[] count = new int [max+1]; //create count array with size [max+1]  
    
    for (int i = 0; i <= max; ++i)   
    {  
        count[i] = 0; // Initialize count array with all zeros  
    }  
        
    for (int i = 0; i < n; i++) // Store the count of each element  
    {  
        count[a[i]]++;  
    }  
    
        for(int i = 1; i<=max; i++)   
        count[i] += count[i-1]; //find cumulative frequency  
    
    /* This loop will find the index of each element of the original array in count array, and 
        place the elements in output array*/  
    for (int i = n - 1; i >= 0; i--) {  
        output[count[a[i]] - 1] = a[i];  
        count[a[i]]--; // decrease count for same numbers  
    }  
    
        for(int i = 0; i<n; i++) {  
        a[i] = output[i]; //store the sorted elements into main array  
        }  
    }  
    
    static void printArr(int[] a, int n) /* function to print the array */  
    {  
        int i;  
        for (i = 0; i < n; i++)  
            Console.Write(a[i] + " ");  
    }  
    
    static void Main() {  
        int[] a = { 43, 31, 2, 7, 10, 1, 5, 6, 3 };  
        int n = a.Length;  
        Console.WriteLine("Before sorting array elements are: ");  
        printArr(a,n);  
        countSort(a,n);
        Console.WriteLine();
        Console.WriteLine("After sorting array elements are: ");    
        printArr(a,n);  
    }  

    Output:
        Before sorting array elemenets are: 
        "43 31 2 7 10 1 5 6 3"
        
        After sorting array elemenets are: 
        "1 2 3 5 6 7 10 31 43"`;

    ngOnInit()
    {
        this.countingSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    countingSort()
    {
        this.countSort(countries, countries.length);
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

    private countSort(a: Country[], n: number): void
    {
        let output = Array(n + 1);
        let max = this.getMax(a, n);
        let count = Array(max + 1);

        for (let i = 0; i <= max; ++i)
        {
            count[i] = 0;
        }

        for (let i = 0; i < n; i++)
        {
            count[a[i].id]++;
        }

        for (let i = 1; i <= max; i++)
            count[i] += count[i - 1];

        for (let i = n - 1; i >= 0; i--)
        {
            output[count[a[i].id] - 1] = a[i];
            count[a[i].id]--;
        }

        for (let i = 0; i < n; i++)
        {
            a[i] = output[i];
        }
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
