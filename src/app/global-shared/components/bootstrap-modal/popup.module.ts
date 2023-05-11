import { NgModule } from "@angular/core";
import { ComponentsModule } from "../../modules/components.module";
import { PopupComponent } from "./popup.component";
import { PopupAnchorDirective } from "./popup-anchor.directive";
import { PopupService } from "./popup.service";

@NgModule({
    declarations: [PopupComponent, PopupAnchorDirective],
    providers:[PopupService],
    imports: [ComponentsModule],
    exports: [PopupComponent]
})
export class PopupModule { }