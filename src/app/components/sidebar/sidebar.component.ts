import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'اللوحة الرئيسية',  icon: 'dashboard', class: '' },
    { path: '/articles', title: 'لوحة الاخبار',  icon: 'library_books', class: '' },
	{ path: '/videos', title: 'لوحة الفيديوهات',  icon: 'movie', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public afAuth: AngularFireAuth,
  private router: Router,
  @Inject(SESSION_STORAGE) private storage: StorageService) {}
  
  logout() {
    this.afAuth.auth.signOut();
    this.storage.set(STORAGE_KEY, null);
    this.router.navigate(['login']);
    }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
