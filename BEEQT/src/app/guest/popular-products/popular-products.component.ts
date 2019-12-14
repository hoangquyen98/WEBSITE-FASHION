import { Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit {
  products: Product[] = [];
  totalProduct = 0;
  private productSub: Subscription;
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts();
    this.productSub = this.productService
      .getProductUpdateListener()
      .subscribe((data: { products: Product[]; productCount: number }) => {
        this.products = data.products;
        this.totalProduct = data.productCount;
      });
  }
}
