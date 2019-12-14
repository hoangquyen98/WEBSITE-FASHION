import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { TeamComponent } from './team/team.component';
import { SpecialPromoComponent } from './special-promo/special-promo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/auth/auth.module';
import { PostListComponent } from './blog/post-list/post-list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ShopCategoryComponent } from './shop/shop-category/shop-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import {RouterModule} from '@angular/router';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    PopularProductsComponent,
    TeamComponent,
    PostListComponent,
    SpecialPromoComponent,
    ShopCategoryComponent,
    ShoppingCartComponent,
    WishlistComponent,
    MyAccountComponent,
    ProductDetailComponent,
    CheckoutComponent,
    OrderCompleteComponent,
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterModule

  ],
  exports: [
    HeaderComponent
  ]
})
export class GuestModule { }
