import { Component, OnInit, Inject } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router,ActivatedRoute } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-add-about',
  templateUrl: './add-about.component.html',
  styleUrls: ['./add-about.component.scss']
})
export class AddAboutComponent implements OnInit {
	
  about_vision: any;
  about_objectives: any;
  about_mission: any;
  about_departments: any;

  constructor(private router: Router,private route: ActivatedRoute,
     public newsService: NewsService,
     @Inject(SESSION_STORAGE) private mstorage: StorageService) {}


  ngOnInit( ) {
    console.log(this.mstorage
      .get(STORAGE_KEY) || 'LocaL storage is empty');
    if (this.mstorage
      .get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    }
	else{
        this.route.params.subscribe( data => {
          this.about_vision = data.vision;
          this.about_objectives = data.objectives;
          this.about_mission = data.mission;
		  this.about_departments = data.departments;
        });
      }
  }
  
 saveFormData(form) {
	this.newsService.addAbout(this.about_vision, this.about_objectives, this.about_mission, this.about_departments).then(
	   (res) => {
		this.router.navigate(['about']);
	});
  }
  
    cancel(){
	  this.router.navigate(['about']);
  }

}
