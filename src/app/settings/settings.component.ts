import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
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

  university: any;
  collage: any;
  logo: any;
  
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private router: Router,
    private storage: AngularFireStorage,
    public FirebaseService: FirebaseService,
		@Inject(SESSION_STORAGE) private mstorage: StorageService,
		private toastr: ToastrService) {}


  ngOnInit( ) {
    if (this.mstorage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
	}
  
 saveFormData(form) {
	 if(this.logo){
		this.FirebaseService.saveSettings(this.university, this.collage, this.logo);
      this.toastr.success('تم الحفظ','تم حفظ المعلومات بنجاح');
      this.router.navigate(['dashboard']);
    }
	 else {
		 this.toastr.error('خطأ','يرجى انتظار تحميل الصورة');
	 }
  }
  
 onSelectedFile(event) {
    this.FirebaseService.deleteOldLogo();
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
