import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { NewsService } from '../services/news.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  selectedFile: File;
  downloadURL: Observable<string>;
  article_title: any;
  article_date: any;
  article_details: any;
  article_image: any;

  constructor(private router: Router,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
     public newsService: NewsService,
     @Inject(SESSION_STORAGE) private mstorage: StorageService) {}


  ngOnInit( ) {
    console.log(this.mstorage
      .get(STORAGE_KEY) || 'LocaL storage is empty');
    if (this.mstorage
      .get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
  }
  
  async saveFormData(form) {
	const imagepath = `posts/${this.selectedFile.name}`;
    const task =   this.storage.upload(imagepath, this.selectedFile).then(res => {
        console.log(res);
      });
      const image_refrence = this.storage.ref(imagepath);
      this.downloadURL = image_refrence.getDownloadURL();
       this.downloadURL.subscribe(url => {
        if(url != null){
			this.article_image = url;
			this.newsService.addNews(this.article_title, this.article_details, this.article_date, this.article_image).then(
			  (res) => {
				this.route.navigate(['articles']);
		        this.article_image = '';
			},(err) => {
        alert("خطا في ادخال البيانات");
    });
		}
      }); 
  }
  
   onSelectedFile(event) {
    this.selectedFile = event.target.files[0];
  }
}
