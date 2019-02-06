import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    aboutList: Observable<any[]>;
    vision;
    objectives;
    mission;
    departments;
  constructor(private firestoreService: NewsService,public afAuth: AngularFireAuth,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit( ) {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.aboutList = this.firestoreService.getAbout().valueChanges();
    }
  }

  ngAfterViewInit(): void {
    this.aboutList.subscribe( data => {
      for(let i of data){
        this.vision = i.vision;
        this.objectives = i.objectives;
        this.mission = i.mission;
        this.departments = i.departments;
      }
      this.spinnerService.hide();
    });
  }
  
    addAbout() {
    this.router.navigate(['add-about', {vision:this.vision, objectives:this.objectives, mission:this.mission, departments:this.departments}]);
  }

}
