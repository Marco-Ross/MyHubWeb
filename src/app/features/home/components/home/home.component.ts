import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication-service/authentication.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    providers: []
})
export class HomeComponent {
    constructor(private router: Router, private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

    homeFG!: FormGroup;
    invalidLoginError: string = "";
    loginFormSubmitted: boolean = false;

    ngOnInit() {
        this.homeFG = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required] //password validator
        });
    }

    Dash() {
        this.router.navigate(['home/dashboard']);
    }

    Logout() {
        this.authenticationService.Logout().subscribe({
            next: _ => {
                this.router.navigate(['']);
            },
            error: _ => {
            }
        });
    }
}