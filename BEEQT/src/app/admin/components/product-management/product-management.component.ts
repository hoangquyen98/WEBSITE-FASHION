import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Product, Category, Added } from 'src/app/core/models/product';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  products: Product[] = [];
  totalProduct = 10;
  displayedColumns = ['image', 'name', 'description',  'category' , 'price' , 'edit', 'delete'];
  dataSource ;
  productsSub: Subscription;
  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.productService.getProductsShopAdmin();
    this.productsSub = this.productService
      .getProductUpdateListener()
      .subscribe((productData: { products: Product[]; productCount: number }) => {
        this.totalProduct = productData.productCount;
        this.products = productData.products;
        this.dataSource = new MatTableDataSource(this.products);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onDeleteProduct(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(id).subscribe((data) => {
          console.log('success');
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        location.reload();
      }
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(ProductManagementDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'product-management-dialog',
  templateUrl: 'product-management-dialog.html'

})


export class ProductManagementDialog  implements OnInit {
  categorys: Category[] = [
    {value: 'Vintage Fashion Style'},
    {value: 'Bohemian Fashion Style'},
    {value: 'Chic Fashion Style'},
    {value: 'Artsy Fashion Style'},
    {value: 'Sexy Fashion Style'}
  ];
  favourites: Added[] = [
    {value: 'true', viewValue: 'Favourite Product'},
    {value: 'false', viewValue: 'Not Favourite Product'},
  ];
  form: FormGroup;
  private mode = 'create';
  constructor(
    private productService: ProductService,
  ) { }
  ngOnInit() {
    this.form = new FormGroup({
      productId: new FormControl(null, {validators: [Validators.required]}),
      productName: new FormControl(null, {validators: [Validators.required]}),
      productCategory: new FormControl(null, {validators: [Validators.required]}),
      productPrice: new FormControl(null, {validators: [Validators.required]}),
      productDescription: new FormControl(null, {validators: [Validators.required]}),
      productImageUrl: new FormControl(null, {validators: [Validators.required]}),
      productAdded: new FormControl(null, {validators: [Validators.required]}),
      productQuatity: new FormControl(null, {validators: [Validators.required]}),
      ratings: new FormControl(null, {validators: [Validators.required]}),
      favourite: new FormControl(null, {validators: [Validators.required]}),
      productSeller: new FormControl(null, {validators: [Validators.required]})
    });
  }
  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }
    this.productService.addProduct(
      this.form.value.productId,
      this.form.value.productName,
      this.form.value.productCategory,
      this.form.value.productPrice,
      this.form.value.productDescription,
      this.form.value.productImageUrl,
      this.form.value.productAdded,
      this.form.value.productQuatity,
      this.form.value.ratings,
      this.form.value.favourite,
      this.form.value.productSeller
    );
    location.reload();
  }
}
