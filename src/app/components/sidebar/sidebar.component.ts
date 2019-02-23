import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { FirebaseService } from 'app/services/firebase.service';
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
    { path: '/about', title: 'لوحة المعلومات',  icon: 'info', class: '' },
    { path: '/contact', title: 'لوحة الاتصال',  icon: 'email', class: '' },
    { path: '/all-notify', title: 'لوحة الاحداث',  icon: 'notifications', class: '' },
    { path: '/settings', title: 'الاعدادات',  icon: 'settings', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  menuItems: any[];
  settingsList: Observable<any[]>;
  logo: any;

  constructor(public afAuth: AngularFireAuth,
  private firestoreService: FirebaseService,
  private router: Router,
  @Inject(SESSION_STORAGE) private storage: StorageService) {}
  
  logout() {
    this.afAuth.auth.signOut();
    this.storage.set(STORAGE_KEY, null);
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.settingsList = this.firestoreService.getSettings();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  ngAfterViewInit() {
    this.settingsList.subscribe( data => {
      if(data[0] == undefined){
        this.logo = "assets/img/uni-logo.png"
      }
      else {
        this.logo = data[0].logo;
        if(this.logo == null || this.logo == undefined){
          this.logo = "assets/img/uni-logo.png";
        }
      }
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
