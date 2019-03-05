import { Component, OnInit, Inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-add-about',
  templateUrl: './add-about.component.html',
  styleUrls: ['./add-about.component.scss']
})
export class AddAboutComponent implements OnInit {
	
  vision;
  objectives;
  mission;

  constructor(private router: Router,private route: ActivatedRoute,
    public FirebaseService: FirebaseService,
    @Inject(SESSION_STORAGE) private mstorage: StorageService) {}


  ngOnInit( ) {
    if (this.mstorage
      .get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }

	  else{
      this.route.params.subscribe( data => {
      this.vision = data.vision;
      this.objectives = data.objectives;
      this.mission = data.mission;
      });
    }
  }
  
  saveFormData(form) {
    this.FirebaseService.addAbout(this.vision, this.objectives, this.mission);
    this.router.navigate(['about']);
  }
}
