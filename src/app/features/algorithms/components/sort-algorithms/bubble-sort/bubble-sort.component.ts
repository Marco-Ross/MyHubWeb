import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country, countries } from '../../search-algorithms/search-constants/countries.constant';
declare var Prism: any;

@Component({
    selector: 'bubble-sort',
    templateUrl: 'bubble-sort.component.html',
    styleUrls: ['bubble-sort.component.scss']
})
export class BubbleSortComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    bubbleSortFG!: FormGroup;
    highlightedCode: string = '';
    countries!: Country[] | undefined;

    code = `
    // An optimized version of Bubble Sort
    static void bubbleSort(int[] arr, int n)
    {
        int temp;
        bool swapped;

        for (var i = 0; i < arr.Length - 1; i++)
        {
            swapped = false;

            for (var j = 0; j < arr.Length - i - 1; j++)
            {
                if (arr[j] > arr[j + 1])
                {
                    // Swap arr[j] and arr[j+1]
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }

            // If no two elements were
            // swapped by inner loop, then break
            if (swapped == false)
                break;
        }
    }
 
    // Function to print an array
    static void printArray(int[] arr)
    {
        for (var i = 0; i < arr.Length; i++)
            Console.Write(arr[i] + " ");
        Console.WriteLine();
    }
 
    // Driver method
    public static void Main()
    {
        int[] arr = { 64, 34, 25, 12, 22, 11, 90 };
        bubbleSort(arr);
        Console.WriteLine("Sorted array:");
        printArray(arr);
    }
    

    Output:
        Sorted array: 
        "11 12 22 25 34 64 90"`;

    ngOnInit()
    {
        this.bubbleSortFG = this.formBuilder.group({});

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        countries.push({ id: 0, name: "United Kingdom", capital: "London", population: 67081234 } as Country)
        this.countries = countries;
    }

    //////

    bubbleSort()
    {
        let temp: Country;
        let swapped: boolean;

        for (let i = 0; i < countries.length - 1; i++)
        {
            swapped = false;

            for (let j = 0; j < countries.length - i - 1; j++)
            {
                if (countries[j].name.localeCompare(countries[j + 1].name) > 0)
                {
                    temp = countries[j];
                    countries[j] = countries[j + 1];
                    countries[j + 1] = temp;
                    swapped = true;
                }
            }

            if (!swapped)
                break;
        }
    }

    reset()
    {
        countries.sort(() => Math.random() - 0.5);
    }
}
