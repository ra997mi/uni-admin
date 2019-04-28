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
  selector: 'app-add-lectures',
  templateUrl: './add-lectures.component.html',
  styleUrls: ['./add-lectures.component.scss']
})
export class AddLecturesComponent implements OnInit, AfterViewInit {

  departList: Observable<any[]>;
  departData: any;

  department: any;
  stage: any;
  lecturename: any;
  teachername: any;
  lecturenumber: any;
  lec: any;
  lec_name: any;

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
    if (this.lec) {
      this.firestoreService.addLecture(this.department, this.stage, this.lecturename, this.teachername, this.lecturenumber, this.lec, this.lec_name);
      this.router.navigate(['lectures']);
    } else {
      this.toastr.error('خطأ', 'يرجى انتظار تحميل المحاضرة');
    }
  }

  onSelectedFile(event) {
    const randomId = Math.random().toString(36).substring(10);
    this.lec_name = 'uma_' + randomId + '_' + event.target.files[0].name;
    const id = '/lectures/' + this.lec_name;
    this.ref = this.mstorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.lec = url;
        });
      })
    ).subscribe();
  }

}
