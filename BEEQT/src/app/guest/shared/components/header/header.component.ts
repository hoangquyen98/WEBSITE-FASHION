import { User } from './../../../../core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { DataService } from './../../../../core/services/data.service';
import { AuthServiceCustomize } from 'src/app/core/services/auth.service';
import { Component, OnInit, Input} from '@angular/core';
import {Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  itemCount = 0;
  wishCount = 0;
  userIsAuthenticated = false;
  user: User;
  constructor(
    private authService: AuthServiceCustomize,
    private router: Router,
    private dataService: DataService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.dataService.count.subscribe(count => this.itemCount = count);
    this.dataService.countWish.subscribe(count => this.wishCount = count);
    const userIdData = localStorage.getItem('userId');
    if (userIdData) {
      this.userIsAuthenticated = true;
      this.getProductDetailsById(userIdData);
    }
  }
  onLogout() {
    this.authService.logout();
    location.reload();
  }
  getProductDetailsById(userId: string) {
    this.userService.getUserDetailsById(userId)
    .subscribe(p => {
      this.user = p as User;
    });
  }
}
