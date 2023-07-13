import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup.component';
import { uploadOptions } from '../upload-component/upload-options.class';

@Injectable()
export class PopupService
{
    constructor(private modalService: NgbModal) { }

    public open(component: any, module: any, options: uploadOptions)
    {
        let modal = this.modalService.open(PopupComponent, { centered: true, size: options.size, windowClass: options.windowClass });
        modal.componentInstance.component = component;
        modal.componentInstance.module = module;
        modal.componentInstance.options = options;

        return modal.result;
    }
}