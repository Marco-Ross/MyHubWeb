import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UploadModule } from 'src/app/global-shared/components/upload-component/upload.module';
import { SafeResourceUrlModule } from 'src/app/global-shared/pipes/safe-resource-url/safe-resource-url.module';
import { PopupModule } from 'src/app/global-shared/components/bootstrap-modal/popup.module';
import { GalleryServiceModule } from './gallery-service/gallery-service.module';
import { LazyImageLoadModule } from './lazy-image-load/lazy-image-load.module';
import { EmptyCommentPipeModule } from './pipes/is-comment-empty/is-comment-empty.module';
import { PageLoadModule } from 'src/app/global-shared/components/loading/page-loading.module';
import { InputPositionModule } from 'src/app/global-shared/directives/input-position/input-position.module';
import { EmojiPickerModule } from 'src/app/global-shared/components/emoji-picker/emoji-picker.module';

@NgModule({
  declarations: [
    GalleryComponent,
  ],
  providers: [],
  imports: [ComponentsModule, GalleryRoutingModule, FontAwesomeModule, UploadModule, SafeResourceUrlModule, PopupModule,
    GalleryServiceModule, LazyImageLoadModule, EmptyCommentPipeModule, PageLoadModule, InputPositionModule, EmojiPickerModule],
  exports: []
})
export class GalleryModule { }