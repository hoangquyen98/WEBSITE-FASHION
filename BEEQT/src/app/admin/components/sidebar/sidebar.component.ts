import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin/user-profile', title: 'My Profile',  icon: 'person', class: '' },
  { path: '/admin/product-management', title: 'Product Management',  icon: 'dashboard', class: '' },
  { path: '/admin/user-management', title: 'User Management',  icon: 'unarchive', class: '' },
  { path: '/admin/post-management', title: 'Post Management',  icon:  'content_paste', class: '' }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
