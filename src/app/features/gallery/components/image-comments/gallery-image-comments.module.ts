import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { GalleryImageCommentsComponent } from './gallery-image-comments.component';
import { SafeResourceUrlModule } from 'src/app/global-shared/pipes/safe-resource-url/safe-resource-url.module';
import { LazyImageLoadModule } from '../gallery/lazy-image-load/lazy-image-load.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmptyCommentPipeModule } from '../gallery/pipes/is-comment-empty/is-comment-empty.module';
import { EmojiPickerModule } from 'src/app/global-shared/components/emoji-picker/emoji-picker.module';
import { InputPositionModule } from 'src/app/global-shared/directives/input-position/input-position.module';

@NgModule({
  declarations: [
    GalleryImageCommentsComponent
  ],
  providers: [],
  imports: [ComponentsModule, SafeResourceUrlModule, LazyImageLoadModule, FontAwesomeModule, EmptyCommentPipeModule, InputPositionModule, EmojiPickerModule],
  exports: []
})
export class GalleryImageCommentsModule { }