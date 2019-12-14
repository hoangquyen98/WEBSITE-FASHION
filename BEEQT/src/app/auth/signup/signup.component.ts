import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceCustomize } from '../../core/services/auth.service';
import { AuthService} from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  constructor(public authService: AuthServiceCustomize, private socialAuthService: AuthService, private route: Router) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
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
