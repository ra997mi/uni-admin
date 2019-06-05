import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/students/student.service'
import { Student } from '../services/students/student.model';
import { Observable } from 'rxjs';
import { FirebaseService } from 'app/services/firebase.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from "@angular/material";
import { finalize } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators/map';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, AfterViewInit {

  departList: Observable<any[]>;
  departData: any;

  studentList: Student[];
  isEdit: boolean;
  btnTXT = 'اضافة'

  image: any;
  img_name: any;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(public service: StudentService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private firestoreService: FirebaseService,
    private spinnerService: NgxSpinnerService,
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.spinnerService.show();
    this.departList = this.firestoreService.getDepart();
    this.resetForm();

    this.service.getStudent().subscribe(actionArray => {
      this.studentList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Student;
      })
    });
  }

  ngAfterViewInit() {
    this.departList.subscribe(data => {
      this.departData = data;
      this.spinnerService.hide();
    });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      fullName: '',
      gender: '',
      birthdate: '',
      departments: '',
      stage: '',
      address: '',
      mobile: '',
      email: '',
      password: '',
      picture: '',
      img_name: ''
    }
  }

  saveFormData(form: NgForm) {
    if (this.image) {
      this.btnTXT = 'اضافة';
      let data = Object.assign({}, form.value);
      let email = data.email;
      data['picture'] = this.image;
      data['img_name'] = this.img_name;
      if (form.value.id == null) {
        this.firestore.doc(`Students/${email}`).set(data);
        this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
      }
      else {
        this.firestore.doc('Students/' + form.value.email).update(data);
      }

      this.resetForm(form);
      this.toastr.success('تمت العملية بنجاح', 'العملية');
    }
    else {
      this.toastr.error('خطأ', 'يرجى انتظار تحميل الصورة');
    }
  }


  onSelectedFile(event) {
    const randomId = Math.random().toString(36).substring(10);
    this.img_name = 'pic-' + randomId + event.target.files[0].name;
    const id = '/profiles/' + this.img_name;
    this.ref = this.storage.ref(id);
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

  onEdit(stu: Student) {
    this.service.formData = Object.assign({}, stu);
    this.btnTXT = "تحديث";
  }

  onDelete(email: string, img_name:string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        const storageRef = firebase.storage().ref();
        storageRef.child(`profiles/${img_name}`).delete();
        this.firestore.doc('Students/' + email).delete();
        this.toastr.warning('تم الحذف بنجاح', 'حذف');
      }
    });
  }
}
