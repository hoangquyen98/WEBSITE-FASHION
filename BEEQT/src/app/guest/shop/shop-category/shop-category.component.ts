import { ToastrService } from 'ngx-toastr';
import { DataService } from './../../../core/services/data.service';
import { Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.css']
})
export class ShopCategoryComponent implements OnInit {
  products: Product[] = [];
  totalProduct = 12;
  productsPerPage = 12;
  currentPage = 1;
  pageSizeOptions = [ 4, 8, 10, 12];
  quantity: number;
  userShopping: string;
  isUser = false;
  private productSub: Subscription;


  constructor(
    public productService: ProductService,
    public dataService: DataService,
    public toastr: ToastrService
    ) {

  }

  ngOnInit() {
    this.quantity = 1;
    this.userShopping = localStorage.getItem('userId');
    this.productService.getProductsShop(this.productsPerPage, this.currentPage);
    this.productSub = this.productService
      .getProductUpdateListener()
      .subscribe((data: { products: Product[]; productCount: number }) => {
        this.products = data.products;
        this.totalProduct = data.productCount;
      });
    if ( this.userShopping ) {
      this.isUser = true;
    }
  }
  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productService.getProductsShop(this.productsPerPage, this.currentPage);
  }
  onAddProductToCart(ProductId: string, Id: string) {
    if (this.isUser) {
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
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
          enableHtml: true
        });
      });
    } else {
      Swal.fire({
        title: 'Please Login to Continue Shopping!',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      });
    }
  }
  onAddProductToWishList(ProductId: string, Id: string) {
    if (this.isUser) {
      let product: Product;
      this.productService.getProductDetailsById(Id)
      .subscribe(p => {
        product = p as Product;
        product.productQuatity = this.quantity;
        let wish: Product[] = JSON.parse(localStorage.getItem('WishList'));
        if (wish == null) {
          wish = [];
          wish.push(product);
        } else {
          const currentProduct = wish.filter(a =>
            a.productId === ProductId
          );

          if (currentProduct.length > 0) {
            wish.filter(a => {
              a.productQuatity = a.productQuatity + this.quantity;
            });
          } else {
            wish.push(product);
          }
        }
        this.dataService.updateWishItemCount(wish.length);
        this.dataService.updateShoppingWishList(wish);
        localStorage.setItem('WishList', JSON.stringify(wish));
        this.toastr.success('<strong>Product Added to the Wishlist</strong>', null, {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
          enableHtml: true
        });
      });
    } else {
      Swal.fire({
        title: 'Please Login to Continue Shopping!',
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        }
      });
    }
  }
}
