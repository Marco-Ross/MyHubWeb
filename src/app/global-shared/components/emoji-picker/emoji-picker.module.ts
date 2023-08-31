import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { EmojiPickerComponent } from './emoji-picker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmojiPickerService } from './emoji-picker.service';


@NgModule({
  declarations: [
    EmojiPickerComponent
  ],
  providers: [EmojiPickerService],
  imports: [ComponentsModule, FontAwesomeModule],
  exports: [EmojiPickerComponent]
})
export class EmojiPickerModule { }