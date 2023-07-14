import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'merge-sort',
    templateUrl: 'merge-sort.component.html',
    styleUrls: ['merge-sort.component.scss']
})
export class MergeSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    mergeSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    static void merge(int[] a, int beg, int mid, int end)    
    {    
        int i, j, k;  
        int n1 = mid - beg + 1;    
        int n2 = end - mid;    
    
    //temporary arrays    
        int[] LeftArray = new int [n1];    
        int[] RightArray = new int [n2];   
        
        /* copy data to temp arrays */  
        for (i = 0; i < n1; i++)    
        LeftArray[i] = a[beg + i];    
        for (j = 0; j < n2; j++)    
        RightArray[j] = a[mid + 1 + j];    
        
        i = 0; /* initial index of first sub-array */  
        j = 0; /* initial index of second sub-array */   
        k = beg;  /* initial index of merged sub-array */  
        
        while (i < n1 && j < n2)    
        {    
            if(LeftArray[i] <= RightArray[j])    
            {    
                a[k] = LeftArray[i];    
                i++;    
            }    
            else    
            {    
                a[k] = RightArray[j];    
                j++;    
            }    
            k++;    
        }    
        while (i<n1)    
        {    
            a[k] = LeftArray[i];    
            i++;    
            k++;    
        }    
        
        while (j<n2)    
        {    
            a[k] = RightArray[j];    
            j++;    
            k++;    
        }    
    }    
    
    static void mergeSort(int[] a, int beg, int end)  
    {  
        if (beg < end)   
        {  
            int mid = (beg + end) / 2;  
            mergeSort(a, beg, mid);  
            mergeSort(a, mid + 1, end);  
            merge(a, beg, mid, end);  
        }  
    }  
    
    /* Function to print the array */  
    static void printArray(int[] a, int n)  
    {  
        int i;  
        for (i = 0; i < n; i++)  
            Console.Write(a[i] + " ");  
    }  
    
    static void Main()   
    {  
        int[] a = { 10, 29, 23, 6, 30, 15, 38, 40 };
        int n = a.Length;
        Console.WriteLine("Before sorting array elements are:");
        printArray(a, n);
        mergeSort(a, 0, n - 1);
        Console.WriteLine();
        Console.WriteLine("After sorting array elements are:");
        printArray(a, n);
    }  
    

    Output:
        Before sorting array elements are:
        "12 11 13 5 6 7"

        After sorting array elements are:
        "5 6 7 11 12 13"`;

    ngOnInit()
    {
        this.mergeSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.countries = countries;

        this.reset();
    }

    //////

    private merge(a: Country[], beg: number, mid: number, end: number): void 
    {
        let i, j, k;
        let n1 = mid - beg + 1;
        let n2 = end - mid;

        let LeftArray: Country[] = Array(n1);
        let RightArray: Country[] = Array(n2);

        for (i = 0; i < n1; i++)
            LeftArray[i] = a[beg + i];
        for (j = 0; j < n2; j++)
            RightArray[j] = a[mid + 1 + j];

        i = 0;
        j = 0;
        k = beg;

        while (i < n1 && j < n2)    
        {
            if (LeftArray[i].id <= RightArray[j].id)    
            {
                a[k] = LeftArray[i];
                i++;
            }
            else    
            {
                a[k] = RightArray[j];
                j++;
            }
            k++;
        }
        while (i < n1)    
        {
            a[k] = LeftArray[i];
            i++;
            k++;
        }

        while (j < n2)    
        {
            a[k] = RightArray[j];
            j++;
            k++;
        }
    }

    private sort(a: Country[], beg: number, end: number): void
    {
        if (beg < end)   
        {
            let mid = Math.floor((beg + end) / 2);
            this.sort(a, beg, mid);
            this.sort(a, mid + 1, end);
            this.merge(a, beg, mid, end);
        }
    }

    mergeSort()
    {
        this.sort(countries, 0, countries.length - 1);
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
