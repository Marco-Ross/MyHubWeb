import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuardHome implements CanActivateChild {

    constructor(private router: Router) { };
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         let hasPermission = true;

         if (!hasPermission)
         {
            this.router.navigateByUrl('unauthorized'); //If the users enters the url directly into bar, then you cannot navigate back with the browser, since it will go back to the unauth url and redirect back here again. (needs a fix)
            return false;
         }   

        return true;
    }
}