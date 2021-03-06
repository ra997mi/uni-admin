import { Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { FirebaseService } from '../services/firebase.service';
const STORAGE_KEY = 'local_user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{
	
  Counter;
  Count

  constructor(private router: Router,
    private firestoreService : FirebaseService,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {
      this.spinnerService.show();
    }

  ngOnInit() {
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
    else {
      this.Counter = this.firestoreService.getCount();
    }
  }
  ngAfterViewInit() {
    this.spinnerService.hide();
    this.Counter.subscribe( data => {
      this.Count = data;
    });
  }
}
