import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators/map';
import {finalize} from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  university_name: any;
  collage_name: any;
  logo: any;
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private router: Router,
    private storage: AngularFireStorage,
     public newsService: NewsService,
		 @Inject(SESSION_STORAGE) private mstorage: StorageService,
		 private toastr: ToastrService) {}


  ngOnInit( ) {
    if (this.mstorage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
	}
  
 saveFormData(form) {
   console.log("getcalled");
   console.log("this logo is " + this.logo);
	 if(this.logo){
     console.log('callled!');
		this.newsService.saveSettings(this.university_name, this.collage_name, this.logo).then(
	   (res) => {
      this.toastr.success('تم الحفظ','تم حفظ المعلومات بنجاح');
      this.router.navigate(['dashboard']);
    });
  }
	 else {
		 this.toastr.error('خطأ','يرجى انتظار تحميل الصورة');
	 }
  }
  
 onSelectedFile(event) {
    this.newsService.deleteOldLogo();
	  const id = '/settings/' + 'unilogo.png';
	  this.ref = this.storage.ref(id);
	  this.task = this.ref.put(event.target.files[0]);
	  this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
	  this.uploadProgress = this.task.percentageChanges();
	  this.task.snapshotChanges().pipe(
		  finalize(() => {
			this.ref.getDownloadURL().subscribe(url => {
        this.logo = url;
			});
		  })
		).subscribe();
	}

}
