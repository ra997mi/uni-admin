import { Component, OnInit,Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'

@Component({
  selector: 'app-all-notify',
  templateUrl: './all-notify.component.html',
  styleUrls: ['./all-notify.component.scss']
})
export class AllNotifyComponent implements OnInit, AfterViewInit  {

  notifyList: Observable<any[]>;
  notifyData: any;

  constructor(private firestoreService: NewsService,
    private router: Router,private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog) {}

  openDialog(item): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'true')
      this.deleteEvent(item);
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.notifyList = this.firestoreService.getEvents().valueChanges();
    }
  }

  ngAfterViewInit() {
    this.notifyList.subscribe( data => {
      this.spinnerService.hide();
      if(data.length == 0){
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else{
        $('#no-items-ava').hide();
        $('#SHOW').show();
        this.notifyData = data;
        var counter = this.notifyData.length;
        this.firestoreService.updateCount(3,counter);
      }
    });
  }

  deleteEvent(item) {
    this.firestoreService.deleteEvent(item).then( () => {
      this.toastr.success('تم الحذف','تم حذف الحدث بنجاح');
    });
  }

  addEvent(){
    this.router.navigate(['notify']);
  }
}

