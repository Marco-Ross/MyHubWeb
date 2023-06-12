import { BinarySearchComponent } from "../search-algorithms/binary-search/binary-search.component";
import { BinarySearchModule } from "../search-algorithms/binary-search/binary-search.module";
import { FuzzySearchComponent } from "../search-algorithms/fuzzy-search/fuzzy-search.component";
import { FuzzySearchModule } from "../search-algorithms/fuzzy-search/fuzzy-search.module";
import { LinearSearchComponent } from "../search-algorithms/linear-search/linear-search.component";
import { LinearSearchModule } from "../search-algorithms/linear-search/linear-search.module";
import { BubbleSortComponent } from "../sort-algorithms/bubble-sort/bubble-sort.component";
import { BubbleSortModule } from "../sort-algorithms/bubble-sort/bubble-sort.module";
import { BucketSortComponent } from "../sort-algorithms/bucket-sort/bucket-sort.component";
import { BucketSortModule } from "../sort-algorithms/bucket-sort/bucket-sort.module";
import { CountingSortComponent } from "../sort-algorithms/counting-sort/counting-sort.component";
import { CountingSortModule } from "../sort-algorithms/counting-sort/counting-sort.module";
import { HeapSortComponent } from "../sort-algorithms/heap-sort/heap-sort.component";
import { HeapSortModule } from "../sort-algorithms/heap-sort/heap-sort.module";
import { InsertionSortComponent } from "../sort-algorithms/insertion-sort/insertion-sort.component";
import { InsertionSortModule } from "../sort-algorithms/insertion-sort/insertion-sort.module";
import { MergeSortComponent } from "../sort-algorithms/merge-sort/merge-sort.component";
import { MergeSortModule } from "../sort-algorithms/merge-sort/merge-sort.module";
import { QuickSortComponent } from "../sort-algorithms/quick-sort/quick-sort.component";
import { QuickSortModule } from "../sort-algorithms/quick-sort/quick-sort.module";
import { RadixSortComponent } from "../sort-algorithms/radix-sort/radix-sort.component";
import { RadixSortModule } from "../sort-algorithms/radix-sort/radix-sort.module";
import { SelectionSortComponent } from "../sort-algorithms/selection-sort/selection-sort.component";
import { SelectionSortModule } from "../sort-algorithms/selection-sort/selection-sort.module";
import { ShellSortComponent } from "../sort-algorithms/shell-sort/shell-sort.component";
import { ShellSortModule } from "../sort-algorithms/shell-sort/shell-sort.module";
import { IAlgorithms } from "./Interfaces/algorithm.interface";

export const algorithmCategories: Array<IAlgorithms> = [
    {
        category: 'Search',
        algorithms: [
            {
                id: 'linearSearch',
                name: 'Linear search',
                component: LinearSearchComponent,
                module: LinearSearchModule
            },
            {
                id: 'binarySearch',
                name: 'Binary search',
                component: BinarySearchComponent,
                module: BinarySearchModule
            },
            {
                id: 'fuzzySearch',
                name: 'Fuzzy search',
                component: FuzzySearchComponent,
                module: FuzzySearchModule
            }
        ]
    },
    {
        category: 'Sort',
        algorithms: [
            {
                id: 'bubbleSort',
                name: 'Bubble Sort',
                component: BubbleSortComponent,
                module: BubbleSortModule
            },
            {
                id: 'selectionSort',
                name: 'Selection Sort',
                component: SelectionSortComponent,
                module: SelectionSortModule
            },
            {
                id: 'insertionSort',
                name: 'Insertion Sort',
                component: InsertionSortComponent,
                module: InsertionSortModule
            },
            {
                id: 'mergeSort',
                name: 'Merge Sort',
                component: MergeSortComponent,
                module: MergeSortModule
            },
            {
                id: 'quickSort',
                name: 'Quick Sort',
                component: QuickSortComponent,
                module: QuickSortModule
            },
            {
                id: 'countingSort',
                name: 'Counting Sort',
                component: CountingSortComponent,
                module: CountingSortModule
            },
            {
                id: 'radixSort',
                name: 'Radix Sort',
                component: RadixSortComponent,
                module: RadixSortModule
            },
            {
                id: 'bucketSort',
                name: 'Bucket Sort',
                component: BucketSortComponent,
                module: BucketSortModule
            },
            {
                id: 'heapSort',
                name: 'Heap Sort',
                component: HeapSortComponent,
                module: HeapSortModule
            },
            {
                id: 'shellSort',
                name: 'Shell Sort',
                component: ShellSortComponent,
                module: ShellSortModule
            }
        ]
    },
    // {
    //     category: 'Graph',
    //     algorithms: []
    // },
    // {
    //     category: 'Tree',
    //     algorithms: []
    // },
    // {
    //     category: 'Dynamic',
    //     algorithms: []
    // },
    // {
    //     category: 'Divide and conquer',
    //     algorithms: []
    // },
    // {
    //     category: 'Greedy',
    //     algorithms: []
    // },
    // {
    //     category: 'Backtracking',
    //     algorithms: []
    // }
];