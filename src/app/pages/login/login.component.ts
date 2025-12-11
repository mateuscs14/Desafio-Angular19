import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {
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

  ngOnInit() {
    this.startImageCarousel();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  images: string[] = ['/salao.jpg', '/salao2.jpg'];
  currentImage: string = this.images[0];
  private carouselInterval: any;

  startImageCarousel() {
    let index = 0;
    this.carouselInterval = setInterval(() => {
      index = (index + 1) % this.images.length;
      this.currentImage = this.images[index];
    }, 5000);
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
