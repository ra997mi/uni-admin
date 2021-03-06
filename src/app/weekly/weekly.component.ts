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
import * as _ from 'lodash';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit, AfterViewInit {

  department: any;
  stage:any;
  rule:any;

  departList: Observable<any[]>;
  departData: any;

  weeklyList: Observable<any[]>;
  weeklyData: any;
  filterData: any;

  /// Active filter rules
  filters = {}

  constructor(private firestoreService: FirebaseService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private dialog: MatDialog,
    private toastr:ToastrService) {}

    ngOnInit() {
      this.spinnerService.show();
      if (this.storage.get(STORAGE_KEY) == null) {
        this.router.navigate(['login']);
      } else {
        this.departList = this.firestoreService.getDepart();
        this.weeklyList = this.firestoreService.getWeekly();
      }
    }
  
    ngAfterViewInit(): void {
      this.departList.subscribe( data => {
          this.departData = data;
      });
      this.weeklyList.subscribe( data => {
        if(data.length == 0){
          $('#no-items-ava').show();
          $('#SHOW').hide();
        }
        else{
          $('#no-items-ava').hide();
          $('#SHOW').show();        
        }
        this.weeklyData = data;
        this.applyFilters();
        this.spinnerService.hide();
      });
    }

    private applyFilters() {
      this.filterData = _.filter(this.weeklyData, _.conforms(this.filters) )
    }
  
     /// filter property by equality to rule
     filterExact(property: string) {
       this.rule = this.department + "_" + this.stage;
      this.filters[property] = val => val == this.rule
      this.applyFilters()
    }

    openDialog(id, imgid): void {
      const dialogRef = this.dialog.open(ConfirmDeleteComponent);
      dialogRef.afterClosed().subscribe(result => {
        if(result == 'true')
        this.deleteWeekly(id, imgid);
      });
    }

    deleteWeekly(id, imgid) {
      this.firestoreService.deleteWeekly(id, imgid);
      this.toastr.success('تم الحذف','تم حذف الجدول بنجاح');
    }
}
