
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User, Account } from '../models/user';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userUpdated = new Subject<{ user: User[], userCount: number }>();
  private users: User[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getUserDetailsById(userId: string): Observable<User> {
    return this.http.get<User>(`${BACKEND_URL}getUserDetails/${userId}`);
  }
  getUsersAdmin() {
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        BACKEND_URL
      )
      .pipe(
        map(userData => {
          return {
            users: userData.users.map(user => {
              return {
                id: user._id,
                email: user.email,
                password: user.password,
                userName: user.userName,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin,
                avatar: user.avatar,
                createdOn: user.stcreatedOnring,
                firstName: user.firstName,
                lastName: user.lastName,
                address1: user.address1,
                address2: user.address2,
                country: user.country,
                state: user.state
              };
            }),
            maxUsers: userData.maxUsers
          };
        })
      )
      .subscribe(transformedUserData => {
        this.users = transformedUserData.users;
        this.userUpdated.next({
          user: [...this.users],
          userCount: transformedUserData.maxUsers

        });
      });
  }

  getUser(id: string) {
    return this.http.get<{
      id: string;
      email: string;
      password: string;
      userName: string;
      phoneNumber: string;
      isAdmin: boolean;
      avatar: string;
      createdOn: string;
      firstName: string;
      lastName: string;
      address1: string;
      address2: string;
      country: string;
      state: string;
    }>(BACKEND_URL + id);
  }
  getUserUpdateListener() {
    return this.userUpdated.asObservable();
  }
  deleteUser(userId: string) {
    console.log(BACKEND_URL + userId);
    return this.http.delete(BACKEND_URL + userId).subscribe(response => {
      console.log(response);
    });
  }
  updateAccount(
    Id: string,
    FistName: string,
    LastName: string,
    Phone: string,
    Avatar: File | string,
    Address: string,
    Country: string,
    State: string
  ) {
      let userUpdate: Account | FormData;
      if (typeof Avatar === 'object') {
        userUpdate = new FormData();
        userUpdate.append('id', Id);
        userUpdate.append('firstName', FistName);
        userUpdate.append('lastName', LastName);
        userUpdate.append('phoneNumber', Phone);
        userUpdate.append('avatar', Avatar);
        userUpdate.append('address1', Address);
        userUpdate.append('country', Country);
        userUpdate.append('state', State);
      } else {
        userUpdate = {
          id: Id,
          firstName: FistName,
          lastName: LastName,
          phoneNumber: Phone,
          avatar: Avatar,
          address1: Address,
          country: Country,
          state: State
        };
      }
      console.log(userUpdate);
      this.http
        .put(BACKEND_URL + 'account/' + Id, userUpdate)
        .subscribe(response => {
          this.router.navigate(['/home/my-account']);
        });
  }
}
