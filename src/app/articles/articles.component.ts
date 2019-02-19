import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
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

  constructor(private firestoreService: FirebaseService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog) {}

    viewDialog(items) {
      this.dialog.open(ArticleViewComponent, {
        data: {article: items}
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
      this.newsList = this.firestoreService.getNews();
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
  
  substringText(text) : any {
		return new DOMParser().parseFromString(text, "text/html").documentElement.textContent.substring(0, 300) + '...';
}

deleteArticle(item,img) {
    this.firestoreService.deleteNews(item,img);
    this.toastr.success('تم الحذف','تم حذف الخبر بنجاح');
}
updateArticle(item) {
    this.router.navigate(['edit-article', item]);
  }
}
