import { Component, OnInit, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  id: any;
  name: any;
  description: any;

  constructor(public router: ActivatedRoute,
    public FirebaseService: FirebaseService,
    private route: Router,
    @Inject(SESSION_STORAGE) private mstorage: StorageService) { }
  
    ngOnInit( ) {
      if (this.mstorage
        .get(STORAGE_KEY) == null) {
        this.route.navigate(['login']);
      }
      else{
        this.router.params.subscribe( data => {
          this.id = data.id;
          this.name = data.name;
          this.description = data.description;
        });
      }
    }
	
	async saveFormData(form) {
    this.FirebaseService.updateDepart(this.id, this.name, this.description);
    this.route.navigate(['departments']);
  }

}
