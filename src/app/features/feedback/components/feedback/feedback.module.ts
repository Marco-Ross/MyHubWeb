import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { FeedbackService } from './feedback.service';
import { SafeResourceUrlModule } from 'src/app/global-shared/pipes/safe-resource-url/safe-resource-url.module';
import { LazyImageLoadModule } from 'src/app/features/gallery/components/gallery/lazy-image-load/lazy-image-load.module';
import { PageLoadModule } from 'src/app/global-shared/components/loading/page-loading.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        FeedbackComponent,
    ],
    providers: [FeedbackService],
    imports: [ComponentsModule, FeedbackRoutingModule, LoadButtonModule, SafeResourceUrlModule, LazyImageLoadModule, PageLoadModule, FontAwesomeModule],
    exports: []
})
export class FeedbackModule { }