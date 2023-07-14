import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emptyComment'
})
export class EmptyCommentPipe implements PipeTransform
{
    transform(comment: string | null): boolean
    {
        if (!comment)
            return false;

        return comment.trim().length !== 0;
    }
}