import { Product } from './../../../core/models/product';
import { DataService } from './../../../core/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  productId: string;
  sizeId: number;
  colorId: number;
  quantity: number;
  userShopping: string;
  isUser = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private dataService: DataService,
    public toastr: ToastrService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.quantity = 1;
    this.userShopping = localStorage.getItem('userId');
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });
    this.getProductDetailsById();
    if (this.userShopping) {
      this.isUser = true;
    }
  }
  onAddToCart(ProductId: string, Id: string) {
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
          timeOut: 500,
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
  getProductDetailsById() {
    this.productService.getProductDetailsById(this.productId)
    .subscribe(p => {
      this.product = p as Product;
      console.log(this.product);
    });
  }

}
