import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit,AfterViewInit {

    contactList: Observable<any[]>;
    email: string;
    number: string;
    lat:string;
    lng:string;

  constructor(private firestoreService: NewsService,public afAuth: AngularFireAuth,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit( ) {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.contactList = this.firestoreService.getContact().valueChanges();
    }
  }

  ngAfterViewInit(): void {
    this.contactList.subscribe( data => {
      for(let i of data){
        this.email = i.email;
        this.number = i.number;
        this.lat = i.lat;
        this.lng = i.lng;
      }
      this.spinnerService.hide();
    });
  }

  addContact() {
    this.router.navigate(['add-contact',{email:this.email, number:this.number, lat:this.lat, lng:this.lng}]);
  }
  
  getLat(lat) : number {
	  return parseFloat(lat);
  }
  
   getLng(lng) : number {
	  return parseFloat(lng);
  }
}
