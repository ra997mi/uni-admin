import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

    contactList: Observable<any[]>;
    contactData: any;
  constructor(private firestoreService: NewsService,public afAuth: AngularFireAuth,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit( ) {
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.contactList = this.firestoreService.getContact().valueChanges();
    }
  }

  ngAfterViewInit(): void {
    this.contactList.subscribe( data => {
      this.contactData = data;
    });
  }
  
    addContact(item) {
    this.router.navigate(['add-contact', item]);
  }
  
  getLat(lat) : number {
	  return parseFloat(lat);
  }
  
   getLng(lng) : number {
	  return parseFloat(lng);
  }
  
  
  

}
