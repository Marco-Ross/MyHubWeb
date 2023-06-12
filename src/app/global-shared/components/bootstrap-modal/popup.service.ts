import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup.component';

@Injectable()
export class PopupService
{
    constructor(private modalService: NgbModal) { }

    public open(component: any, module: any, options: any = {})
    {
        let modal = this.modalService.open(PopupComponent, { centered: true, size: options.size });
        modal.componentInstance.component = component;
        modal.componentInstance.module = module;
        modal.componentInstance.options = options;

        return modal.result;
    }
}