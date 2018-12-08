import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, AfterViewInit {

  videosList: Observable<any[]>;
  videosData: any;
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
	   this.videosList = this.firestoreService.getVideos().valueChanges();
   }
 }
   ngAfterViewInit(): void {
    this.videosList.subscribe( data => {
      this.videosData = data;
    });
  }
  
  deleteVideo(item) {
    this.firestoreService.deleteVideos(item).then( () => {
      alert('تم الحذف بنجاح');
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
