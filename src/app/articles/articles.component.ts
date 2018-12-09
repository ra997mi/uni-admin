import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit,  AfterViewInit {
	
    newsList: Observable<any[]>;
    articlesData: any;
  constructor(private firestoreService: NewsService,public afAuth: AngularFireAuth,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
	private messageService: MessageService) {}

  ngOnInit( ) {
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.newsList = this.firestoreService.getNews().valueChanges();
    }
  }

  ngAfterViewInit(): void {
    this.newsList.subscribe( data => {
      this.articlesData = data;
	  this.storage.set("newsCount", this.articlesData.length);
    });
  }
  
toHTML(input) : any {
		return new DOMParser().parseFromString(input, "text/html").documentElement.textContent.substring(0,300) + '...';
}

deleteArticle(item,img) {
    this.firestoreService.deleteNews(item,img).then( () => {
      this.messageService.add({severity:'success', summary:'تم الحذف', detail:'تم حذف الخبر بنجاح',life: 3000});
    });
  }
updateArticle(item) {
    this.router.navigate(['edit-article', item]);
  }
  addArticle() {
    this.router.navigate(['add-article']);
  }
}
