import { DataService } from './../../core/services/data.service';
import { ItemCart } from './../../core/models/cart';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { OrderService } from './../../core/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private products: any = new Array();
  items: ItemCart[] = [];
  total = 0;
  qty = 0;
  user: User[] = [];
  userID = localStorage.getItem('userId');
  email: string;
  cart: Product[] = [];
  public productSub: Subscription;
  public sendEmailSub: Subscription;
  public getUserSub: Subscription;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
    public dataService: DataService
  ) {
    this.productService.getProducts();
    this.productService
      .getProductUpdateListener()
      .subscribe((data: { products: Product[] }) => {
        this.products.push(data.products);
      });

  }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('Cart'));
    this.getTotal();
  }
  onRemoveProductsFromCart(Id: string) {
    this.cart = this.cart.filter(a => a.productId !== Id);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.dataService.updateCartItemCount(this.cart.length);
    this.dataService.updateShoppingCart(this.cart);
    this.getTotal();
  }
  getTotal() {
    this.total = 0;
    this.qty = 0;
    this.cart.forEach((element) => {
      this.total = this.total + (element.productPrice * element.productQuatity);
      this.qty = this.qty + element.productQuatity ;
    });
  }
  sendMail() {
    this.userService.getUser(this.userID)
    .subscribe(userData => {
      this.sendEmailSub = this.orderService.sendEmail(userData).
      subscribe(data => {
        const msg = data[' message  ' ];
        alert(msg);
      }, error => {
        console.error(error, 'error');
      } );
    });
  }
}
