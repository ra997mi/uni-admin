import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, Inject ,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { NewsService } from '../services/news.service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,AfterViewInit{
	
  Counter;
  CountData;

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    private firestoreService : NewsService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

 ngOnInit( ) {
   console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
   if (this.storage.get(STORAGE_KEY) == null) {
     this.router.navigate(['login']);
   }
   else {
     this.Counter = this.firestoreService.getCount().valueChanges();
   }
 }
 ngAfterViewInit(): void {
  this.Counter.subscribe( data => {
    this.CountData = data;
  });
}
}
