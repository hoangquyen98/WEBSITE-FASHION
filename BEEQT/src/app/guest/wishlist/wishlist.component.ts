import { Product, WishProduct } from 'src/app/core/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { DataService } from './../../core/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wish: WishProduct[] = [];
  total = 0;
  qty = 0;
  quantity: number;
  constructor(
    private productService: ProductService,
    public dataService: DataService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.quantity = 1;
    this.wish = JSON.parse(localStorage.getItem('WishList'));
    this.getTotalWish();
  }
  getTotalWish() {
    this.total = 0;
    this.qty = 0;
    this.wish.forEach((element) => {
      this.total = this.total + element.productPrice;
      this.qty = this.qty + 1;
    });
  }
  onRemoveProductsFromWish(Id: string) {
    this.wish = this.wish.filter(a => a.productId !== Id);
    localStorage.setItem('WishList', JSON.stringify(this.wish));
    this.dataService.updateWishItemCount(this.wish.length);
    this.dataService.updateShoppingWish(this.wish);
    this.getTotalWish();
  }
  onAddProductToCartWish(ProductId: string, Id: string) {
    let product: Product;
    this.productService.getProductDetailsById(Id)
    .subscribe(p => {
      product = p as Product;
      product.productQuatity = this.quantity;
      let cart: Product[] = JSON.parse(localStorage.getItem('Cart'));
      if (cart == null) {
        cart = [];
        cart.push(product);
      } else {
        const currentProduct = cart.filter(a =>
          a.productId === ProductId
        );

        if (currentProduct.length > 0) {
          cart.filter(a => {
            a.productQuatity = a.productQuatity + this.quantity;
          });
        } else {
          cart.push(product);
        }
      }
      this.dataService.updateCartItemCount(cart.length);
      this.dataService.updateShoppingCart(cart);
      localStorage.setItem('Cart', JSON.stringify(cart));
      this.toastr.success('<strong >Product Added to the Cart</strong>', null, {
        timeOut: 500,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
        enableHtml: true
      });
    });
    this.onRemoveProductsFromWish(ProductId);
  }

}
