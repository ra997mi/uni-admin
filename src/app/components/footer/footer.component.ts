import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsService } from 'app/services/news.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit, AfterViewInit{

  test : Date = new Date();
  settingsList: Observable<any[]>;
  settingsData: any;

  constructor(private firestoreService: NewsService) {}

  ngOnInit() {
    this.settingsList = this.firestoreService.getSettings().valueChanges();
  }
  ngAfterViewInit() {
    this.settingsList.subscribe( data => {
      this.settingsData = data;
    });
  }

}
