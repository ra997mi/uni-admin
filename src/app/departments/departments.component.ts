import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit, AfterViewInit {

  departList: Observable<any[]>;
  departData: any;

  constructor(private firestoreService: FirebaseService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog) {}

    openDialog(item): void {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'true')
        this.deleteDepart(item);
      });
    }

  ngOnInit() {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.departList = this.firestoreService.getDepart();
    }
  }

  ngAfterViewInit() {
    this.departList.subscribe( data => {
      if(data.length == 0){
        $('#no-items-ava').show();
        $('#SHOW').hide();
      } 
      else{
        $('#no-items-ava').hide();
        $('#SHOW').show();
      }
        this.departData = data;
        this.spinnerService.hide();
    });
  }
  
  deleteDepart(item) {
    this.firestoreService.deleteDepart(item);
    this.toastr.success('تم الحذف','تم الحذف بنجاح');
  }

  updateDepart(item) {
    this.router.navigate(['edit-department', item]);
  }
}
