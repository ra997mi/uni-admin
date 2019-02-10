import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component'
import {MatDialog} from "@angular/material";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, AfterViewInit {

  videosList: Observable<any[]>;
  videosData: any;
  constructor(private firestoreService: NewsService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private messageService: MessageService,
    private dialog: MatDialog) {}

    openDialog(item): void {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'true')
        this.deleteVideo(item);
      });
    }

 ngOnInit() {
  this.spinnerService.show();
   if (this.storage.get(STORAGE_KEY) == null) {
     this.router.navigate(['login']);
   } else {
	   this.videosList = this.firestoreService.getVideos().valueChanges();
   }
 }
   ngAfterViewInit(): void {
    this.videosList.subscribe( data => {
      if(data.length == 0){
        $('#no-items-ava').show();
        $('#SHOW').hide();
      } 
      else{
        $('#no-items-ava').hide();
        $('#SHOW').show();
      }
      this.videosData = data;
      var counter = this.videosData.length;
      this.firestoreService.updateCount(2,counter);
      this.spinnerService.hide();

    });
  }
  
  deleteVideo(item) {
    this.firestoreService.deleteVideos(item).then( () => {
      this.messageService.add({severity:'success', summary:'تم الحذف', detail:'تم حذف الفيديو بنجاح',life: 3000});
    });
  }
updateVideo(item) {
    this.router.navigate(['edit-video', item]);
  }
  addVideo() {
    this.router.navigate(['add-video']);
  }
  
  youtube_parser(url){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	var match = url.match(regExp);
	if (match && match[2].length == 11) {
	  return match[2];
	} else {
	  //error
	}
}

}
