import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounce, map, startWith, timer } from 'rxjs';
declare var Prism: any;

@Component({
    selector: 'fuzzy-search',
    templateUrl: 'fuzzy-search.component.html',
    styleUrls: ['fuzzy-search.component.scss']
})
export class FuzzySearchComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    fuzzySearchFG!: FormGroup;
    highlightedCode: string = '';
    words$!: string[] | undefined;

    wordList = [
        "Abjure", "Future", "Picnic", "Agonistic", "Garland", "Protect",
        "Airline", "Gigantic", "Publish", "Bandit", "Goofy", "Quadrangle",
        "Banquet", "Government", "Recount", "Binoculars", "Grandnieces", "Redoubtable",
        "Biologist", "Handbook", "Reflection", "Blackboard", "Himself", "Reporter",
        "Board", "Indulge", "Ring", "Bookworm", "Inflatable", "Salesclerk",
        "Butterscotch", "Inimical", "Snapshot", "Camera", "Interim", "Shellfish",
        "Campus", "Invest", "Ship", "Catfish", "Jackpot", "Significance",
        "Carsick", "Kitchenette", "Sometimes", "Celebrate", "Law", "Sublime"];

    code = `
    public static int LevenshteinDistance(string source1, string source2) //O(n*m)
    {
        var source1Length = source1.Length;
        var source2Length = source2.Length;

        var matrix = new int[source1Length + 1, source2Length + 1];

        // First calculation, if one entry is empty return full length
        if (source1Length == 0)
            return source2Length;

        if (source2Length == 0)
            return source1Length;

        // Initialization of matrix with row size 
        // source1Length and columns size source2Length
        for (var i = 0; i <= source1Length; matrix[i, 0] = i++){}
        for (var j = 0; j <= source2Length; matrix[0, j] = j++){}

        // Calculate rows and columns distances
        for (var i = 1; i <= source1Length; i++)
        {
            for (var j = 1; j <= source2Length; j++)
            {
                var cost = (source2[j - 1].ToLower() == source1[i - 1].ToLower()) ? 0 : 1;

                matrix[i, j] = 
                Math.Min(
                    Math.Min(matrix[i - 1, j] + 1, matrix[i, j - 1] + 1),
                    matrix[i - 1, j - 1] + cost
                );
            }
        }
        // return result
        return matrix[source1Length, source2Length];
    }
 
    // Driver code
    public static void Main()
    {
        var stringOne = "helo";
        var stringTwo = "hello";

        int result = LevenshteinDistance(stringOne, stringTwo);

        Console.WriteLine("Levenshtein Distance is " + result);
    }
    

    Output: 
        "Levenshtein Distance is 1"`;

    ngOnInit()
    {
        this.fuzzySearchFG = this.formBuilder.group({
            search: '',
            distance: 1
        });

        this.highlightedCode = Prism.highlight(this.code, Prism.languages.clike);

        this.fuzzySearchFG.get('search')?.valueChanges.pipe(
            startWith(''),
            debounce(() => timer(200))
        ).subscribe({
            next: (word) =>
            {
                this.words$ = this.fuzzySearch(word);
            }
        });

        this.fuzzySearchFG.get('distance')?.valueChanges.subscribe({
            next: (number) =>
            {
                if (isNaN(number))
                    this.fuzzySearchFG.get('distance')?.setValue(1);

                let fuzzyValue = this.fuzzySearchFG.get('search')?.value;

                if (fuzzyValue)
                    this.words$ = this.fuzzySearch(fuzzyValue);
            }
        });
    }

    //////

    fuzzySearch(searchString: string)
    {
        if (!searchString)
            return this.wordList;

        var fuzzyValues = this.performFuzzySearch(searchString);

        if (fuzzyValues.length)
            return fuzzyValues;

        return [];
    }

    performFuzzySearch(searchString: string): Array<string>
    {
        let fuzzyMatches: Array<string> = [];

        let source1Length = searchString.length;

        for (let wl = 0; wl < this.wordList.length; wl++)
        {
            let word = this.wordList[wl];

            let source2Length = word.length;

            let matrix: number[][] = [];

            if (source1Length == 0)
                continue;

            if (source2Length == 0)
                continue;

            for (let i = 0; i <= source1Length; i++)
            {
                matrix[i] = [];
                matrix[i][0] = i;
            }
            for (let j = 0; j <= source2Length; j++)
            {
                matrix[0][j] = j;
            }

            for (let i = 1; i <= source1Length; i++)
            {
                for (let k = 1; k <= source2Length; k++)
                {
                    let cost = (searchString[i - 1].toLocaleLowerCase() == word[k - 1].toLocaleLowerCase()) ? 0 : 1;

                    matrix[i][k] = Math.min(matrix[i - 1][k] + 1, matrix[i][k - 1] + 1, matrix[i - 1][k - 1] + cost);
                }
            }

            if (matrix[source1Length][source2Length] <= this.fuzzySearchFG.get('distance')?.value)
                fuzzyMatches.push(word);
        }

        return fuzzyMatches;
    }
}
