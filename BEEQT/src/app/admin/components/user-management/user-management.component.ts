import { User } from './../../../core/models/user';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit, OnDestroy {

  displayedColumns = ['position', 'email', 'firstname', 'lastname', 'phone', 'address', 'state' , 'country'];
  users: User[] = [];
  totalUser = 10;
  userSub: Subscription;
  dataSource;
  constructor(public userService: UserService) {}
  ngOnInit() {
    this.userService.getUsersAdmin();
    this.userSub = this.userService
      .getUserUpdateListener()
      .subscribe((userData: { user: User[]; userCount: number }) => {
        this.totalUser = userData.userCount;
        this.users = userData.user;
        this.dataSource = new MatTableDataSource(this.users);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


}

