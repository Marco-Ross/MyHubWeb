import { Component, EventEmitter, Injector, Input, NgModuleRef, ViewChild, createNgModule } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupAnchorDirective } from './popup-anchor.directive';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'popup',
    templateUrl: 'popup.component.html'
})
export class PopupComponent
{
    constructor(private activeModal: NgbActiveModal, private injector: Injector, private formBuilder: FormBuilder) { }

    @Input() component: any;
    @Input() module: any;
    @Input() options: any;

    @ViewChild(PopupAnchorDirective, { static: true }) popupBodyAnchor!: PopupAnchorDirective;
    popupFG!: FormGroup;
    onClose!: any;

    //////

    ngOnInit()
    {
        this.popupFG = this.formBuilder.group({
        });

        this.loadComponent();
    }

    loadComponent()
    {
        const viewContainerRef = this.popupBodyAnchor.viewContainerRef;
        viewContainerRef.clear();

        const moduleRef: NgModuleRef<typeof this.module> = createNgModule(this.module, this.injector);

        const componentRef = viewContainerRef.createComponent<typeof this.component>(this.component, { ngModuleRef: moduleRef });

        componentRef.instance.options = this.options;

        this.onClose = componentRef.instance.onClose;
    }

    dismiss(event: any)
    {
        this.activeModal.dismiss();
        event.stopPropagation();
    }

    close()
    {
        this.onClose().then((result: any) =>
        {
            this.activeModal.close(result);
        }, () => { });
    }
}