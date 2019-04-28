import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent implements OnInit, AfterViewInit {

  department: any = '';
  stage: any = '';

  departList: Observable<any[]>;
  departData: any;

  lectureNameList: any = [];

  constructor(private firestoreService: FirebaseService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

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
      this.departData = data;
    });
    this.spinnerService.hide();
  }

  getData() {
    if (this.department != '' && this.stage != '') {
      this.lectureNameList = [];
      this.firestoreService.getLecturesListName(this.department, this.stage).subscribe(data => {
        if (data != null || data != undefined) {
          var keyNames = Object.keys(data);
          this.lectureNameList = keyNames;
        }
        else {
          console.log("COURSE NOT FOUND");
        }
      });
    }
  }
}
