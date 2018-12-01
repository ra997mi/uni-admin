import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

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
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit( ) {
    console.log(this.storage
      .get(STORAGE_KEY) || 'LocaL storage is empty');
    if (this.storage
      .get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.newsList = this.firestoreService.getNews().valueChanges();
    }
  }

  
  ngAfterViewInit(): void {
    this.newsList.subscribe( data => {
      this.articlesData = data;
    });
  }
  
toHTML(input) : any {
		return new DOMParser().parseFromString(input, "text/html").documentElement.textContent.substring(0,35);
}

deleteArticle(item) {
    this.firestoreService.deleteNews(item).then( () => {
      alert('تم الحذف بنجاح');
    });
  }
updateArticle(item) {
    this.router.navigate(['edit-article', item]);
  }
  addArticle() {
    this.router.navigate(['add-article']);
  }
}
