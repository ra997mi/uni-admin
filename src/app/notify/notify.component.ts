import { NewsService } from '../services/news.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

	event_title: any;
  event_content: any;

  constructor(private router: Router,
     public newsService: NewsService,
     @Inject(SESSION_STORAGE) private mstorage: StorageService) {}

  ngOnInit() {
    if (this.mstorage
      .get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
  }
  
  saveFormData(form) {
	this.newsService.addEvent(this.event_title, this.event_content).then(
		(res) => {
      this.router.navigate(['all-notify']);
			});
  }
  cancel(){
	  this.router.navigate(['all-notify']);
  }

}
