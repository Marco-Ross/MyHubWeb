import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class HubToastService
{
    constructor(private toastr: ToastrService) { }

    public error(message: string, response: HttpErrorResponse)
    {
        if (response.status !== 401)
            this.toastr.error(message);
    }

    public success(message: string)
    {
        this.toastr.success(message);
    }
}