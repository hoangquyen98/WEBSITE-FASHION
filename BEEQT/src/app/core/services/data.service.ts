import { Product, WishProduct } from 'src/app/core/models/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private message = new BehaviorSubject('default');
  currentMessage = this.message.asObservable();
  private ItemCount = new BehaviorSubject(0);
  private ItemCountWish = new BehaviorSubject(0);

  count: Observable<number> = this.ItemCount.asObservable();
  countWish: Observable<number> = this.ItemCountWish.asObservable();
  private shoppingCart = new BehaviorSubject([]);
  private wishList = new BehaviorSubject([]);
  cart = this.shoppingCart.asObservable();
  wish = this.wishList.asObservable();
  constructor() {
    const isEmptyCart: boolean = localStorage.getItem('Cart') == null;
    this.updateCartItemCount(isEmptyCart ? 0 : JSON.parse(localStorage.getItem('Cart')).length);
    this.updateShoppingCart(isEmptyCart ? [] : JSON.parse(localStorage.getItem('Cart')));
    const isEmptyWish: boolean = localStorage.getItem('WishList') == null;
    this.updateWishItemCount(isEmptyWish ? 0 : JSON.parse(localStorage.getItem('WishList')).length);
    this.updateShoppingWish(isEmptyWish ? [] : JSON.parse(localStorage.getItem('WishList')));
  }

  changeMessage(message: string) {
    this.message.next(message);
  }

  updateCartItemCount(count: number) {
    this.ItemCount.next(count);
  }

  updateShoppingCart(cartItems: Product[]) {
    this.shoppingCart.next(cartItems);
  }
  updateWishItemCount(countWish: number) {
    this.ItemCountWish.next(countWish);
  }

  updateShoppingWish(wishItems: WishProduct[]) {
    this.wishList.next(wishItems);
  }
  updateShoppingWishList(wishItems: Product[]) {
    this.wishList.next(wishItems);
  }

}
