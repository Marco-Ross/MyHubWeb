import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    providers: []
})
export class HomeComponent {
    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    Dash(){
        this.router.navigate(['home/dashboard']);   
    }
    Logout(){
        this.authenticationService.Logout().subscribe({
            next: _ => {
                this.router.navigate(['']);
            },
            error: _ => {
            }
          });
    }
 }