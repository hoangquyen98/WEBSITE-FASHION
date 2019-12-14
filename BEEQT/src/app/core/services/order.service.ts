import { Order } from './../models/order';
import { User } from 'src/app/core/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const BACKEND_URL = environment.apiUrl + '/order';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private http: HttpClient, private router: Router) {}


  sendEmail(obj): Observable<User> {
    console.log(obj);
    return this.http.post<User>(BACKEND_URL + '/orderconfirm', obj);
  }
  addOrder(date: string, product: string, creator: string) {
    const orderData = new FormData();
    orderData.append('date', date);
    orderData.append('product', product);
    orderData.append('creator', creator);

    this.http
      .post<{ message: string; order: Order }>(
        BACKEND_URL + '/createOrder',
        orderData
      )
      .subscribe(responseData => {
      });
  }

}
