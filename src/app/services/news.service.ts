import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage} from 'angularfire2/storage';

import * as firebase from 'firebase/app';

import { newsdatatype } from '../services/newsdatatype';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth,private storage: AngularFireStorage,) {}
  
    addVideos(title: string, link: string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`videosList/${id}`).set({
      id,
      title,
	  link,
    });
  }
  
    addAbout(vision: string, objectives: string, mission: string, departments: string): Promise<void> {
    const id = 'uni-about';
    return this.firestore.doc(`aboutList/${id}`).set({
      vision,
	  objectives,
	  mission,
	  departments
    });
  }
    getAbout(): AngularFirestoreCollection<newsdatatype> {
    return this.firestore.collection('aboutList');
  }

  updateCount(news:boolean, Counter: string){
    const videos = 'VidCounter';
    const newz = 'NewsCounter';
    if(news){
    let NewsCount = Counter;
      return this.firestore.doc(`NewsCount/${newz}`).set({
        NewsCount
        });
    } else{
      let VideosCount = Counter;
      return this.firestore.doc(`NewsCount/${videos}`).set({
        VideosCount
        });
    }
  }

  getCount(){
    return this.firestore.collection('NewsCount');
  }
  
    addContact(email: string, number: string, lat: string, lng: string): Promise<void> {
    const id = 'uni-contact';
    return this.firestore.doc(`contactList/${id}`).set({
    email,
	  number,
	  lat,
	  lng
    });
  }
    getContact(): AngularFirestoreCollection<newsdatatype> {
    return this.firestore.collection('contactList');
  }
  
    updateVideos(id, title, link): Promise<void> {
     return this.firestore.doc(`videosList/${id}`).set({
      id,
      title,
	  link,
    });
  }
  getVideos(): AngularFirestoreCollection<newsdatatype> {
    return this.firestore.collection('videosList');
  }
  
  deleteVideos(videosid: string): Promise<void> {
    return this.firestore.doc(`videosList/${videosid}`).delete();
  }
  
  addNews(title: string, description: string, date: string, image: string, imgname: string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      description,
      date,
      image,
	  imgname,
    });
  }
  updateNews(id, title, description, date, image, imgname): Promise<void> {
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
  
  deleteNews(newsid: string,imgid: string): Promise<void> {
	const storageRef = firebase.storage().ref();
    storageRef.child(`posts/${imgid}`).delete();
    return this.firestore.doc(`newsList/${newsid}`).delete();
  }
  async login(email , password) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email , password)
      .then(res => {
      });
  }
}
