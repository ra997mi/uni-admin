import { Component, OnInit, Inject} from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { NgxSpinnerService } from 'ngx-spinner';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    aboutData;
    vision;
    objectives;
    mission;
    departments;
  constructor(private firestoreService: FirebaseService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit() {
    this.spinnerService.show();
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.aboutData = this.firestoreService.getAbout();
    }
  }

  ngAfterViewInit() {
    this.aboutData.subscribe( data => {
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
