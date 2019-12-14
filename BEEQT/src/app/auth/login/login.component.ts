import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceCustomize } from '../../core/services/auth.service';
import { AuthService} from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  constructor(public authService: AuthServiceCustomize, private socialAuthService: AuthService, private route: Router) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
  async enterEmail() {
    const { value: email } = await Swal.fire({
      title: 'Enter Your Email Address',
      input: 'email',
      inputPlaceholder: 'Enter your email address'
    });
    this.authService.sendEmailPassword(email);
    setTimeout (() => {
      if (email) {
        Swal.fire(`<span style="color:green">Please confirm your email !<span>`);
      }
    }, 2000);
  }
  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(user =>  this.authService.loginWithGoogle(user).subscribe((res) => {
        const dataRes: any = res;
        localStorage.setItem('token', dataRes.token);
        localStorage.setItem('userId', dataRes.userId);
        this.route.navigate(['/']);
     })
    );
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(user =>  this.authService.loginWithFaceBook(user).subscribe((res) => {
      const dataRes: any = res;
      localStorage.setItem('token', dataRes.token);
      localStorage.setItem('userId', dataRes.userId);
      this.route.navigate(['/']);
   })
  );
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }
}
