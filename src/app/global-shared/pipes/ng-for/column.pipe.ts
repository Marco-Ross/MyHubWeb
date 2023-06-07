import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'columns' })
export class ColumnPipe implements PipeTransform
{
    constructor() { }

    public transform(array: Array<any> | undefined, columns = 0)
    {
        if (!array)
            return [];

        let splitArray: any[][] = [];
        let inner = [];

        for (let i = 0; i < array.length; i++)
        {
            if (i == 0 || i % columns != 0)
                inner.push(array[i]);
            else
            {
                if (inner.length < 4)
                    inner.push(array[i]);

                splitArray.push(inner);

                inner = [];
            }
        }

        if (inner.length)
            splitArray.push(inner);

        return splitArray;
    }
}