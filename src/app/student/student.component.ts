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

  constructor(private service: StudentService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private firestoreService: FirebaseService,
    private spinnerService: NgxSpinnerService,
    private afAuth: AngularFireAuth,
    private dialog: MatDialog) { }

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
      address: '',
      mobile: '',
      email: '',
      password: ''
    }
  }

  saveFormData(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('Students').add(data);
      this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);
    }
    else {
      this.firestore.doc('Students/' + form.value.id).update(data);
    }

    this.resetForm(form);
    this.toastr.success('تمت الاضافة بنجاح', 'اضافة');
  }

  onEdit(stu: Student) {
    this.service.formData = Object.assign({}, stu);
  }

  onDelete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.firestore.doc('Students/' + id).delete();
        this.toastr.warning('تم الحذف بنجاح', 'حذف');
      }
    });
  }
}
