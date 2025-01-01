import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginModel } from '../../Models/login-dto.model';
import { Router } from '@angular/router';
import { NavigatorLinks } from '../../Constants/navigator-links.constants';
import { AuthenticationService } from '../../Services/Authentication.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onLogin() {
    if (this.formGroup.valid) {
      const model: LoginModel = {
        email: this.formGroup.value.email ?? "",
        password: this.formGroup.value.password ?? ""
      }
      console.log(model);
      const connection = this.authService.login(model).subscribe(done => {
        if (done) {
          this.router.navigate([NavigatorLinks.DASHBOARD]);
        } else
          alert("Not valid Login");
      })
      this.destroyRef.onDestroy(() => connection.unsubscribe());
    } else {
      alert("Not valid Input");
    }
  }
}
