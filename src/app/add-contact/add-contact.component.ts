import { NewsService } from '../services/news.service';
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
	
  contact_email: any;
  contact_number: any;
  contact_map_lat: any;
  contact_map_lng: any;

  constructor(private router: Router,private route: ActivatedRoute,
     public newsService: NewsService,
     @Inject(SESSION_STORAGE) private mstorage: StorageService) {}


  ngOnInit( ) {
    if (this.mstorage
      .get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
	else{
        this.route.params.subscribe( data => {
            this.contact_email = data.email;
            this.contact_number = data.number;
            this.contact_map_lat = data.lat;
            this.contact_map_lng = data.lng;
        });
      }
  }
  
 saveFormData(form) {
	this.newsService.addContact(this.contact_email, this.contact_number, this.contact_map_lat, this.contact_map_lng).then(
	   (res) => {
		this.router.navigate(['contact']);
	});
  }
  
    cancel(){
	  this.router.navigate(['contact']);
  }

}
