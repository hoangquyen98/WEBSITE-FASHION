import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Product } from 'src/app/core/models/product';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  product: Product[];
  checkoutProducts: Product[];
  totalPrice = 0;
  date = Date.now().toString();
  userID = localStorage.getItem('userId');
  state = 'false';
  public sendEmailSub: Subscription;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private route: Router
  ) {
    const products = JSON.parse(localStorage.getItem('Cart'));
    this.checkoutProducts = products;
    products.forEach((product) => {
      this.totalPrice += product.productPrice;
    });
  }
  orderComplete() {
    this.userService.getUser(this.userID)
    .subscribe(userData => {
      this.sendEmailSub = this.orderService.sendEmail(userData).
      subscribe(data => {
        Swal.fire({
          title: 'Please confirm your email !',
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        });
        location.reload();
      }, error => {
        console.error(error, 'error');
      } );
    });
    localStorage.removeItem('Cart');

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đặt Hàng Thành Công',
      showConfirmButton: false,
      timer: 1500
    });
    this.route.navigate(['/home']);
  }
  ngOnInit() {
    const product = JSON.parse(localStorage.getItem('Cart'));
    const ID = localStorage.getItem('userId');
    console.log(product, ID);
    this.orderService.addOrder(this.date, product, ID);
  }
}
