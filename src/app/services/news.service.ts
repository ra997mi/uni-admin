import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage} from '@angular/fire/storage';
import { newsdatatype } from '../services/newsdatatype';
import { formatDate } from '@angular/common';

import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth, private storage: AngularFireStorage) {}
  
    addVideos(title: string, link: string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`videosList/${id}`).set({
      id,
      title,
	    link,
    });
  }

  addEvent(title: string, content: string): Promise<void> {
    let today= new Date();
    let mDate = formatDate(today, 'medium', 'en-US');
    const id = this.firestore.createId();
    return this.firestore.doc(`eventList/${id}`).set({
      id,
      title,
      content,
      mDate
    });
  }

  getEvents(): AngularFirestoreCollection<void> {
    return this.firestore.collection('eventList');
  }

  deleteEvent(eventid: string): Promise<void> {
    return this.firestore.doc(`eventList/${eventid}`).delete();
  }
  
    addAbout(vision: string, objectives: string, mission: string, departments: string): Promise<void> {
    const id = 'uni-about';
    return this.firestore.doc(`aboutList/${id}`).set({
    id,
    vision,
	  objectives,
	  mission,
	  departments
    });
  }
    getAbout(): AngularFirestoreCollection<void> {
    return this.firestore.collection('aboutList');
  }

  updateCount(news:number, Counter: string){
    const videos = 'VidCounter';
    const newz = 'NewsCounter';
    const notify = 'NotifyCounter';
    if(news == 1){
    let NewsCount = Counter;
      return this.firestore.doc(`NewsCount/${newz}`).set({
        NewsCount
        });
    } else if(news == 2){
      let VideosCount = Counter;
      return this.firestore.doc(`NewsCount/${videos}`).set({
        VideosCount
        });
    }
    else if(news == 3){
      let NotifyCounter = Counter;
      return this.firestore.doc(`NewsCount/${notify}`).set({
        NotifyCounter
        });
    }
  }

  getCount(){
    return this.firestore.collection('NewsCount');
  }
  
    addContact(email: string, number: string, lat: string, lng: string): Promise<void> {
    const id = 'uni-contact';
    return this.firestore.doc(`contactList/${id}`).set({
    id,
    email,
	  number,
	  lat,
	  lng
    });
  }
    getContact(): AngularFirestoreCollection<void> {
    return this.firestore.collection('contactList');
  }
  
    updateVideos(id, title, link): Promise<void> {
     return this.firestore.doc(`videosList/${id}`).set({
      id,
      title,
	    link,
    });
  }
  getVideos(): AngularFirestoreCollection<void> {
    return this.firestore.collection('videosList');
  }
  
  deleteVideos(videosid: string): Promise<void> {
    return this.firestore.doc(`videosList/${videosid}`).delete();
  }
  
  addNews(title, description, image, imgname): Promise<void> {
    const id = this.firestore.createId();
    let today= new Date();
    let date = formatDate(today, 'medium', 'en-US');
    return this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      description,
      date,
      image,
	    imgname,
    });
  }
  updateNews(id, title, description, image, imgname): Promise<void> {
    let today= new Date();
    let date = formatDate(today, 'medium', 'en-US');
     return this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      description,
      date,
      image,
	    imgname,
    });
  }
  getNews(): AngularFirestoreCollection<newsdatatype> {
    return this.firestore.collection('newsList');
  }
  
  deleteNews(newsid: string, imgid: string): Promise<void> {
	const storageRef = firebase.storage().ref();
    storageRef.child(`posts/${imgid}`).delete();
    return this.firestore.doc(`newsList/${newsid}`).delete();
  }
  async login(email , password) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email , password);
  }

  saveSettings(university_name: string, collage_name: string, logo: string): Promise<void> {
    const id = 'settingData';
    return this.firestore.doc(`setting/${id}`).set({
      id,
      university_name,
      collage_name,
      logo
    });
  }
  getSettings(): AngularFirestoreCollection<void>{
    return this.firestore.collection('setting');
  }

  deleteOldLogo(){
    const storageRef = firebase.storage().ref();
    storageRef.child(`settings/unilogo.png`).delete();
  }
}
