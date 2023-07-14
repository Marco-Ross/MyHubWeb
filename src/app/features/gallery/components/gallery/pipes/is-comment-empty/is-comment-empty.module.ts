import { NgModule } from '@angular/core';
import { EmptyCommentPipe } from './is-comment-empty.pipe';

@NgModule({
  declarations: [
    EmptyCommentPipe
  ],
  providers: [],
  imports: [],
  exports: [EmptyCommentPipe]
})
export class EmptyCommentPipeModule { }