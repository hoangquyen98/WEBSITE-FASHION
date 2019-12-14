import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './blog/post-list/post-list.component';
import { ShopCategoryComponent } from './shop/shop-category/shop-category.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'blog', component : PostListComponent },
  { path : 'shop', component : ShopCategoryComponent },
  { path : 'shop/product-details/:id', component : ProductDetailComponent },
  { path : 'cart', component : ShoppingCartComponent },
  { path : 'wishlist', component : WishlistComponent },
  { path : 'my-account', component : MyAccountComponent },
  { path : 'checkout', component : CheckoutComponent },
  { path : 'order-complete', component : OrderCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
