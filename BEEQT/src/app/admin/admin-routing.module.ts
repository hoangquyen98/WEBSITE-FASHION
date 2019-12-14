import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Routes } from '@angular/router';
import { PostManagementComponent } from './components/post-management/post-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'user-profile',   component: UserProfileComponent },
  { path: 'user-management',   component: UserManagementComponent },
  { path: 'post-management',   component: PostManagementComponent },
  { path: 'product-management',   component: ProductManagementComponent },
  { path: '',   component: ProductManagementComponent }

];
