import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

 ngOnInit( ) {
   console.log(this.storage
     .get(STORAGE_KEY) || 'LocaL storage is empty');
   if (this.storage
     .get(STORAGE_KEY) == null) {
     this.router.navigate(['login']);
   } else {
   }
 }

}
