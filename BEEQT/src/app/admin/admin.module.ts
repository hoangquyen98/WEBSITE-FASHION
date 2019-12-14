import { AdminLayoutRoutes } from './admin-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTableModule,
  MatCardModule


} from '@angular/material';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PostManagementComponent } from './components/post-management/post-management.component';
import { ProductManagementComponent , ProductManagementDialog} from './components/product-management/product-management.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserManagementComponent,
    PostManagementComponent,
    ProductManagementComponent,
    ProductManagementDialog
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes)

  ],
  entryComponents: [ProductManagementDialog]
})
export class AdminModule { }
