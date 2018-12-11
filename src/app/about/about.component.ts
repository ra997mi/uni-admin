import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from '../services/news.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    aboutList: Observable<any[]>;
    aboutData: any;
  constructor(private firestoreService: NewsService,public afAuth: AngularFireAuth,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit( ) {
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
    if (this.storage.get(STORAGE_KEY) == null) {
      this.router.navigate(['login']);
    } else {
      this.aboutList = this.firestoreService.getAbout().valueChanges();
    }
  }

  ngAfterViewInit(): void {
    this.aboutList.subscribe( data => {
      this.aboutData = data;
    });
  }
  
    addAbout(item) {
    this.router.navigate(['add-about', item]);
  }

}
