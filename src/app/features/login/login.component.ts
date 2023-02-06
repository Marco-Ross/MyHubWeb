import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private loginService: LoginService) { }

  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this.Login();
  }

  public Login() {
    this.loginService.Login(this.username, this.password).subscribe({
      next: (response) => {
        //redirect to new page
      },
      error: () => {
        console.log("error");
      }
    });
  }
}