import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/product/';
const URL = environment.apiUrl + '/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        BACKEND_URL
      )
      .pipe(
        map(productData => {
          return {
            products: productData.products.map(product => {
              return {
                  id: product._id,
                  productId: product.productId,
                  productName: product.productName,
                  productCategory: product.productCategory,
                  productPrice: product.productPrice,
                  productDescription: product.productDescription,
                  productImageUrl: product.productImageUrl,
                  productAdded: product.productAdded,
                  productQuatity: product.productQuatity,
                  ratings: product.ratings,
                  favourite: product.favourite,
                  productSeller: product.productSeller
              };
            }),
            maxProducts: productData.maxProducts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.products = transformedPostData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedPostData.maxProducts
        });
      });
  }
  getProductsShop(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(productData => {
          return {
            products: productData.products.map(product => {
              return {
                  id: product._id,
                  productId: product.productId,
                  productName: product.productName,
                  productCategory: product.productCategory,
                  productPrice: product.productPrice,
                  productDescription: product.productDescription,
                  productImageUrl: product.productImageUrl,
                  productAdded: product.productAdded,
                  productQuatity: product.productQuatity,
                  ratings: product.ratings,
                  favourite: product.favourite,
                  productSeller: product.productSeller
              };
            }),
            maxProducts: productData.maxProducts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.products = transformedPostData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedPostData.maxProducts
        });
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProductDetailsById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${BACKEND_URL}getProductDetails/${productId}`);
  }
  getProductsShopAdmin() {
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        BACKEND_URL
      )
      .pipe(
        map(productData => {
          return {
            products: productData.products.map(product => {
              return {
                  id: product._id,
                  productId: product.productId,
                  productName: product.productName,
                  productCategory: product.productCategory,
                  productPrice: product.productPrice,
                  productDescription: product.productDescription,
                  productImageUrl: product.productImageUrl,
                  productAdded: product.productAdded,
                  productQuatity: product.productQuatity,
                  ratings: product.ratings,
                  favourite: product.favourite,
                  productSeller: product.productSeller
              };
            }),
            maxProducts: productData.maxProducts
          };
        })
      )
      .subscribe(transformedProductData => {
        this.products = transformedProductData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedProductData.maxProducts
        });
      });
  }

  addProduct(
    productId: string,
    productName: string,
    productCategory: string,
    productPrice: string,
    productDescription: string,
    productImageUrl: string,
    productAdded: string,
    productQuatity: string,
    ratings: string,
    favourite: string,
    productSeller: string
  ) {
    const productData = new FormData();
    productData.append('productId', productId);
    productData.append('productName', productName);
    productData.append('productCategory', productCategory);
    productData.append('productPrice', productPrice);
    productData.append('productDescription', productDescription);
    productData.append('productImageUrl', productImageUrl);
    productData.append('productAdded', productAdded);
    productData.append('productQuatity', productQuatity);
    productData.append('ratings', ratings );
    productData.append('favourite', favourite );
    productData.append('productSeller', productSeller );

    this.http
      .post<{ message: string; post: Product }>(
        URL,
        productData
      )
      .subscribe(responseData => {
        this.router.navigate(['/admin']);
      });
  }
  UpdateProduct(
    productId: string,
    productName: string,
    productCategory: string,
    productPrice: string,
    productDescription: string,
    productImageUrl: string,
    productAdded: string,
    productQuatity: string,
    ratings: string,
    favourite: string,
    productSeller: string
  ) {
    const productData = new FormData();
    productData.append('productId', productId);
    productData.append('productName', productName);
    productData.append('productCategory', productCategory);
    productData.append('productPrice', productPrice);
    productData.append('productDescription', productDescription);
    productData.append('productImageUrl', productImageUrl);
    productData.append('productAdded', productAdded);
    productData.append('productQuatity', productQuatity);
    productData.append('ratings', ratings );
    productData.append('favourite', favourite );
    productData.append('productSeller', productSeller );

    this.http
      .post<{ message: string; post: Product }>(
        URL,
        productData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }
  deleteProduct(productId: string) {
    return this.http.delete(BACKEND_URL + 'delete/' + productId);
  }
}
