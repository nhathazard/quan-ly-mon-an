import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  isLogin: any;
  title = 'my-app';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.isLogin = this.authService.isLoggedIn();
    console.log('this.isLogin', this.isLogin);
  }

  logout() {
    this.authService.logout();
    this.isLogin = this.authService.isLoggedIn();
    this.router.navigate(['login']);
  }
}
