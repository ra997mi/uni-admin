import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from 'app/services/firebase.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit, AfterViewInit{

  test : Date = new Date();
  settingsList: Observable<any[]>;
  university: any;

  constructor(private firestoreService: FirebaseService) {}

  ngOnInit() {
    this.settingsList = this.firestoreService.getSettings();
  }
  ngAfterViewInit() {
    this.settingsList.subscribe( data => {
      if(data[0] == undefined){
        this.university = "منصة جامعتي"
      }
      else{
        this.university = data[0].university;
        if(this.university == null || this.university == undefined){
          this.university = "منصة جامعتي"
        }
      }
    });
  }

}
