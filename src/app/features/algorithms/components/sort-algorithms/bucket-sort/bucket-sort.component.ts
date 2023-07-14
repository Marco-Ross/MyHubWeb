import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'bucket-sort',
    templateUrl: 'bucket-sort.component.html',
    styleUrls: ['bucket-sort.component.scss']
})
export class BucketSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    bucketSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    // Function to sort arr[] of size n
    // using bucket sort
    static void bucketSort(float []arr, int n)
    {
        if (n <= 0)
            return;
    
        // 1) Create n empty buckets
        List<float>[] buckets = new List<float>[n];
    
        for (int i = 0; i < n; i++) {
            buckets[i] = new List<float>();
        }
    
        // 2) Put array elements in different buckets
        for (int i = 0; i < n; i++) {
            float idx = arr[i] * n;
            buckets[(int)idx].Add(arr[i]);
        }
    
        // 3) Sort individual buckets
        for (int i = 0; i < n; i++) {
            buckets[i].Sort();
        }
    
        // 4) Concatenate all buckets into arr[]
        int index = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < buckets[i].Count; j++) {
                arr[index++] = buckets[i][j];
            }
        }
    }
    
    // Driver code
    public static void Main()
    {
        float []arr = { (float)0.897, (float)0.565,
                    (float)0.656, (float)0.1234,
                    (float)0.665, (float)0.3434 };
    
        int n = arr.Length;
        bucketSort(arr, n);
    
        Console.WriteLine("Sorted array is ");
        foreach(float el in arr) {
        Console.Write(el + " ");
        }
    }
    
    
    Output:
        Sorted array: 
        "1 5 7 8 9 10"`;

    ngOnInit()
    {
        this.bucketSortFG = this.formBuilder.group({
            sort: ''
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        countries.forEach((country) =>
        {
            country.id = Math.random();
        });

        this.countries = countries;

        this.reset();
    }

    //////

    bucketSort()
    {
        let n = countries.length;

        if (n <= 0)
            return;

        const buckets: Array<Country>[] = new Array(n);

        for (let i = 0; i < n; i++)
        {
            buckets[i] = new Array<Country>();
        }

        for (let i = 0; i < n; i++)
        {
            const idx: number = countries[i].id * n;
            buckets[Math.floor(idx)].push(countries[i]);
        }

        for (let i = 0; i < n; i++)
        {
            buckets[i].sort();
        }

        let index = 0;
        for (let i = 0; i < n; i++)
        {
            for (let j = 0; j < buckets[i].length; j++)
            {
                countries[index++] = buckets[i][j];
            }
        }
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
