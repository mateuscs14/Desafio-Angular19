import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  toggleMode(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      if (this.loginForm.valid) {
        if (this.authService.login(this.loginForm.value)) {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/']);
        } else {
          alert('Email ou senha inválidos.');
        }
      } else {
        this.loginForm.markAllAsTouched();
      }
    } else {
      if (this.registerForm.valid) {
        if (this.authService.register(this.registerForm.value)) {
          alert('Cadastro realizado com sucesso! Faça login.');
          this.toggleMode(true);
        } else {
          alert('Este email já está cadastrado.');
        }
      } else {
        this.registerForm.markAllAsTouched();
      }
    }
  }
}
