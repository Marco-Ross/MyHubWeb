import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { GalleryImageCommentsComponent } from './gallery-image-comments.component';
import { GalleryImageCommentsService } from './gallery-image-comments.service';
import { SafeResourceUrlModule } from 'src/app/global-shared/pipes/safe-resource-url/safe-resource-url.module';
import { LazyImageLoadModule } from '../gallery/lazy-image-load/lazy-image-load.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmptyCommentPipeModule } from '../gallery/pipes/is-comment-empty/is-comment-empty.module';

@NgModule({
  declarations: [
    GalleryImageCommentsComponent
  ],
  providers: [GalleryImageCommentsService],
  imports: [ComponentsModule, SafeResourceUrlModule, LazyImageLoadModule, FontAwesomeModule, EmptyCommentPipeModule],
  exports: []
})
export class GalleryImageCommentsModule { }