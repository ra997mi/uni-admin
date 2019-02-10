import { NewsService } from '../services/news.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import {MessageService} from 'primeng/api';
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
     private messageService: MessageService,
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
      this.messageService.add({severity:'warn', summary:'تم الارسال', detail:'تم ارسال الحدث بنجاح',life: 3000});
      this.router.navigate(['all-notify']);
			},(err) => {
        alert("خطا في ادخال البيانات");
    });
  }
  cancel(){
	  this.router.navigate(['all-notify']);
  }

}
