import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { NewsService } from '../services/news.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit{

  selectedFile: File;
  downloadURL: Observable<string>;
  article_id: any;
  article_title: any;
  article_date: any;
  article_details: any;
  article_image: any;

  constructor(public router: ActivatedRoute,
    private storage: AngularFireStorage, 
    public newsService: NewsService,
    private route: Router,
    public afAuth: AngularFireAuth,
    @Inject(SESSION_STORAGE) private mstorage: StorageService) { }
  
    ngOnInit( ) {
      console.log(this.mstorage
        .get(STORAGE_KEY) || 'LocaL storage is empty');
      if (this.mstorage
        .get(STORAGE_KEY) == null) {
        this.route.navigate(['login']);
      }
      else{
        this.router.params.subscribe( data => {
          this.article_id = data.id;
          this.article_title = data.title;
          this.article_date = data.date;
          this.article_details = data.description;
          this.article_image = data.image;
        });
      }
    }

   async saveFormData(form) {
    const imagepath = `posts/${this.selectedFile.name}`;
      const task =  await this.storage.upload(imagepath, this.selectedFile).then(res => {
          console.log(res);
        });
        const image_refrence = this.storage.ref(imagepath);
        this.downloadURL = image_refrence.getDownloadURL();
        await this.downloadURL.subscribe(url => {
          if(url != null){
        this.article_image = url;
        this.newsService.updateNews(this.article_id, this.article_title, this.article_details, this.article_date, this.article_image).then(
          (res) => {
            this.route.navigate(['articles']);
          this.article_image = '';
        },(err) => {
          alert("خطا في تحديث البيانات");
      });
      }
        }); 
    }
    
     onSelectedFile(event) {
      this.selectedFile = event.target.files[0];
    }
}
