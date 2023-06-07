import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'binary-search',
    templateUrl: 'binary-search.component.html',
    styleUrls: ['binary-search.component.scss']
})
export class BinarySearchComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    linearSearchFG!: FormGroup;
    highlightedRecursiveCode: string = '';
    highlightedIterativeCode: string = '';
    active = 1;
    countries!: Country[] | undefined;

    iterativeCode = `
    static int BinarySearch(int[] numbers, int x)
    {
        int low = 0, high = numbers.Length - 1;
        while (low <= high)
        {
            int middle = Math.floor(low + (high - low) / 2);
 
            // Check if x is present at mid
            if (numbers[middle] == x)
                return middle;
 
            // If x greater, ignore left half
            if (numbers[middle] < x)
                low = middle + 1;
 
            // If x is smaller, ignore right half
            else
                high = middle - 1;
        }
 
        // If we reach here, then element was not present
        return -1;
    }
 
    // Driver code
    public static void Main()
    {
        int[] numbers = { 2, 3, 4, 10, 40 };
        int n = numbers.Length;
        int x = 10;
        int result = BinarySearch(numbers, x);
        if (result == -1)
            Console.WriteLine("Element is not present in array");
        else
            Console.WriteLine("Element is present at index " + result);
    }
    

    Output: "Element is present at index 3"`;

    recursiveCode = `
    static int BinarySearch(int[] numbers, int low, int high, int x)
    {
        if (low <= high)
        {
            int middle = Math.floor(low + (high - low) / 2);

            // Check if x is present at mid
            if (numbers[middle] == x)
                return middle;

            // If x greater, ignore left half
            if (numbers[middle] < x)
                return BinarySearch(numbers, middle + 1, high, x);

            // If x is smaller, ignore right half
            return BinarySearch(numbers, low, middle - 1, x);
        }
 
        // If we reach here, then element was not present
        return -1;
    }
 
    // Driver code
    public static void Main()
    {
        int[] numbers = { 2, 3, 4, 10, 40 };
        int n = numbers.Length;
        int x = 10;
        int result = BinarySearch(numbers, 0, n - 1, x);
        if (result == -1)
            Console.WriteLine("Element is not present in array");
        else
            Console.WriteLine("Element is present at index " + result);
    }
    
    
    Output: 
        "Element is present at index 3"`;

    ngOnInit()
    {
        this.linearSearchFG = this.formBuilder.group({
            search: ''
        });

        this.highlightedRecursiveCode = Prism.highlight(this.recursiveCode, Prism.languages.clike);
        this.highlightedIterativeCode = Prism.highlight(this.iterativeCode, Prism.languages.clike);

        this.countries = countries;
    }

    //////

    iterativeSearch(searchId: number)
    {
        var low = 0, high = countries.length - 1;

        while (low <= high)
        {
            var middle = Math.floor(low + (high - low) / 2);

            if (countries[middle].id == searchId)
            {
                this.countries = [countries[middle]];
                break;
            }

            if (countries[middle].id < searchId)
                low = middle + 1;

            else
                high = middle - 1;
        }
    }

    reset()
    {
        this.countries = countries;
    }
}
