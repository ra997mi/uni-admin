import { Component, OnInit,Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  video_id: any;
  video_title: any;
  video_link: any;

  constructor(public router: ActivatedRoute,
    public newsService: NewsService,
    private route: Router,
    @Inject(SESSION_STORAGE) private mstorage: StorageService) { }
  
    ngOnInit( ) {
      if (this.mstorage
        .get(STORAGE_KEY) == null) {
        this.route.navigate(['login']);
      }
      else{
        this.router.params.subscribe( data => {
          this.video_id = data.id;
          this.video_title = data.title;
          this.video_link = data.link;
        });
      }
    }
	
	async saveFormData(form) {
		this.newsService.updateVideos(this.video_id, this.video_title, this.video_link).then(
          (res) => {
            this.route.navigate(['videos']);
        },(err) => {
          alert("خطا في تحديث البيانات");
      });

    }

    cancel(){
      this.route.navigate(['videos']);
    }
}
