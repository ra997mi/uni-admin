import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { ArticleViewComponent } from '../article-view/article-view.component'
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, AfterViewInit {
	
    newsList: Observable<any[]>;
    articlesData: any;
  constructor(private firestoreService: NewsService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog) {}

    viewDialog() {
      this.dialog.open(ArticleViewComponent, {
        data: {article: this.articlesData}
      });
    }
  
  openDialog(item,img): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true')
      this.deleteArticle(item,img);
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.newsList = this.firestoreService.getNews().valueChanges();
    }
  }

  ngAfterViewInit(): void {
    this.newsList.subscribe( data => {
      if(data.length == 0){
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else{
        $('#no-items-ava').hide();
        $('#SHOW').show();        
      }
      this.articlesData = data;
      var counter = this.articlesData.length;
      this.firestoreService.updateCount(1,counter);
      this.spinnerService.hide();
    });
  }
  
toHTML(input) : any {
		return new DOMParser().parseFromString(input, "text/html").documentElement.textContent.substring(0,300) + '...';
}

deleteArticle(item,img) {
    this.firestoreService.deleteNews(item,img).then( () => {
      this.toastr.success('تم الحذف','تم حذف الخبر بنجاح');    });
  }
updateArticle(item) {
    this.router.navigate(['edit-article', item]);
  }
}
