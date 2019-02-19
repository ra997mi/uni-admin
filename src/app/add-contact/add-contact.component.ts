import { FirebaseService } from '../services/firebase.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
	
  email: any;
  number: any;
  map_lat: any;
  map_lng: any;

  constructor(private router: Router,private route: ActivatedRoute,
    public FirebaseService: FirebaseService,
    @Inject(SESSION_STORAGE) private mstorage: StorageService) {}


  ngOnInit( ) {
    if (this.mstorage
      .get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
	  else{
      this.route.params.subscribe( data => {
      this.email = data.email;
      this.number = data.number;
      this.map_lat = data.lat;
      this.map_lng = data.lng;
      });
    }
  }
  
 saveFormData(form) {
	this.FirebaseService.addContact(this.email, this.number, this.map_lat, this.map_lng);
		this.router.navigate(['contact']);
  }
}
