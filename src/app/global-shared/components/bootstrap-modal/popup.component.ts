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
    result: any = {};
    popupFG!: FormGroup;

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

        if (componentRef.instance.popupForm)
            componentRef.instance.popupForm.subscribe({
                next: (form: any) =>
                {
                    this.popupFG = form;
                }
            });

        Object.keys(componentRef.instance).forEach(key =>
        {
            if (!(componentRef.instance[key] instanceof EventEmitter) || key == 'popupForm')
                return;

            componentRef.instance[key].subscribe({
                next: (value: any) =>
                {
                    this.result[key] = value;
                }
            });
        });

        componentRef.changeDetectorRef.detectChanges();
    }

    dismiss()
    {
        this.activeModal.dismiss();
    }

    close()
    {
        this.activeModal.close(this.result);
    }
}