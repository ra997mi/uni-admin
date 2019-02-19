import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';
declare const google: any;

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit,AfterViewInit {
  
  contactList: Observable<any[]>;
  email;
  number;
  lat;
  lng;

  constructor(private firestoreService: FirebaseService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit() {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.contactList = this.firestoreService.getContact();
    }
  }

  ngAfterViewInit() {
    this.contactList.subscribe( data => {
      for(let i of data){
        this.email = i.email;
        this.number = i.number;
        this.lat = i.lat;
        this.lng = i.lng;
      }
      this.spinnerService.hide();
      this.loadMap();
    });
  }

  addContact() {
    this.router.navigate(['add-contact',{email:this.email, number:this.number, lat:this.lat, lng:this.lng}]);
  }

  loadMap(){
    var myLatlng = new google.maps.LatLng(parseFloat(this.lat), parseFloat(this.lng));
    var mapOptions = {
        zoom: 18,
        center: myLatlng,
        scrollwheel: false
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "University"
    });
    marker.setMap(map);
  }
}
