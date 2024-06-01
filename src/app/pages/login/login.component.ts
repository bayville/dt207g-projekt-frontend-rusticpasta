import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { NgFor } from '@angular/common';
import { ErrorMessage } from '../../models/error-message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router){}

  form: any = {
    username: null,
    password: null
  };

  formErrors: ErrorMessage[] = [];

  onSubmit(e: Event): void {
    console.log(e);
    e.preventDefault();

    const { username, password } = this.form;

    //Logs in, and navigates to admin-dashboard
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data.response.token);
        this.router.navigateByUrl('/dashboard');
        
      },
      error: err => {
  
        if (err.error.errors){
          this.formErrors = err.error.errors;
        } else if (err.error.message){
          this.formErrors = [{"msg": err.error.message}];
        }

        console.error("Errors", err);
      }
    });
  }
}
