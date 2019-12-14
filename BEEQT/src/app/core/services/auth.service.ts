import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Router } from '@angular/router';
import {AuthData, UserData} from '../../auth/auth.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({providedIn: 'root'})
export class AuthServiceCustomize {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private isAdmin: boolean;
  constructor(private http: HttpClient, private router: Router) {}
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  createUser(emailAuth: string, passwordAuth: string) {
    this.isAdmin = false;
    const today = new Date();
    const CreatedOn = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    const authdata: UserData = {
      email: emailAuth,
      password: passwordAuth,
      userName: '',
      phoneNumber: '',
      isAdmin: this.isAdmin,
      avatar: '',
      createdOn: CreatedOn,
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      country: '',
      state: ''
    };
    this.http.post(BACKEND_URL + '/signup', authdata)
    .subscribe((resData) => {
      this.router.navigate(['/']);
    });
  }
  login(emailAuth: string, passwordAuth: string) {
    const authdata: AuthData = {email: emailAuth, password: passwordAuth};
    this.http.post<{ token: string; expiresIn: number; userId: string, isAdmin: boolean }>(
      BACKEND_URL + '/login', authdata)
    .subscribe(response => {
      console.log('this a respon ' + response);
      const token = response.token;
      this.token = token;
      this.authStatusListener.next(true);
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        this.saveAuthData(token, expirationDate, this.userId);
        if (response.isAdmin) {
          this.router.navigate(['/admin/user-profile']);
        }  else {
          this.router.navigate(['/']);
        }
      }

    });
  }
  loginWithGoogle(user) {
    return this.http.post(BACKEND_URL + '/logingoogle', {
      email: user.email,
      username: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.photoUrl
    }).pipe(map( (res) => {
      return res;
    }));
  }
  loginWithFaceBook(user) {
    return this.http.post(BACKEND_URL + '/loginfacebook', {
      email: user.email,
      username: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.photoUrl
    }).pipe(map( (res) => {
      return res;
    }));
  }
  sendEmailPassword(Email: string) {
    console.log(Email);
    return this.http.post<{email: string}>(BACKEND_URL + '/passwordconfirm', {
      email: Email
    });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/home/']);
  }
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private getAuthData() {
    const tokenData = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userIdData = localStorage.getItem('userId');
    if (!tokenData || !expirationDate) {
      return;
    }
    return {
      token: tokenData,
      expirationDate: new Date(expirationDate),
      userId: userIdData
    };
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('Cart');
    localStorage.removeItem('WishList');
  }
}
