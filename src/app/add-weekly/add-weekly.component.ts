import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators/map';
import { finalize } from 'rxjs/operators';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { NgxSpinnerService } from 'ngx-spinner';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-add-weekly',
  templateUrl: './add-weekly.component.html',
  styleUrls: ['./add-weekly.component.scss']
})
export class AddWeeklyComponent implements OnInit, AfterViewInit {

  departList: Observable<any[]>;
  departData: any;

  department: any;
  stage: any;
  image: any;
  img_name: any;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private firestoreService: FirebaseService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private mstorage: AngularFireStorage) { }

  ngOnInit() {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.departList = this.firestoreService.getDepart();
    }
  }

  ngAfterViewInit() {
    this.departList.subscribe(data => {
      if (data.length == 0) {
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else {
        $('#no-items-ava').hide();
        $('#SHOW').show();
      }
      this.departData = data;
      this.spinnerService.hide();
    });
  }

  saveFormData(form) {
    if (this.image) {
      this.firestoreService.addweekly(this.department, this.stage, this.image, this.img_name);
      this.router.navigate(['weekly']);
    }
    else {
      this.toastr.error('خطأ', 'يرجى انتظار تحميل الصورة');
    }
  }

  onSelectedFile(event) {
    const randomId = Math.random().toString(36).substring(2);
    this.img_name = 'uni-weekly' + randomId + event.target.files[0].name;
    const id = '/weekly/' + this.img_name;
    this.ref = this.mstorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.image = url;
        });
      })
    ).subscribe();
  }

}
