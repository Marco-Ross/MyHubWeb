import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { GalleryRoutingRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UploadModule } from 'src/app/global-shared/components/upload-component/upload.module';
import { SafeResourceUrlModule } from 'src/app/global-shared/pipes/safe-resource-url/safe-resource-url.module';
import { PopupModule } from 'src/app/global-shared/components/bootstrap-modal/popup.module';
import { GalleryServiceModule } from './gallery-service/gallery-service.module';
import { LazyImageLoadModule } from './lazy-image-load/lazy-image-load.module';
import { EmptyCommentPipeModule } from './pipes/is-comment-empty/is-comment-empty.module';

@NgModule({
  declarations: [
    GalleryComponent,
  ],
  providers: [],
  imports: [ComponentsModule, GalleryRoutingRoutingModule, FontAwesomeModule, UploadModule, SafeResourceUrlModule, PopupModule, GalleryServiceModule, LazyImageLoadModule, EmptyCommentPipeModule],
  exports: []
})
export class GalleryModule { }