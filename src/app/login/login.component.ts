import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
interface user {
  username: string;
  role: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response.access_token);
          const decodedToken: user = jwtDecode(response.access_token);
          localStorage.setItem('user_role', decodedToken?.role);
          alert('Đăng nhập thành công!');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Lỗi đăng nhập:', err);
          this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng';
        },
      });
    }
  }
}
