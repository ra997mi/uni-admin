import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { formatDate } from '@angular/common';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}
  
  addVideos(title, link) {
  const id = this.firestore.createId();
  this.firestore.doc(`videosList/${id}`).set({
    id,
    title,
	  link,
    });
  }

  updateVideos(id, title, link) {
    this.firestore.doc(`videosList/${id}`).set({
      id,
      title,
	    link,
    });
  }
  getVideos(){
    return this.firestore.collection('videosList').valueChanges();
  }
  
  deleteVideos(id) {
    this.firestore.doc(`videosList/${id}`).delete();
  }

  addEvent(title, content) {
    let today= new Date();
    let date = formatDate(today, 'medium', 'en-US');
    const id = this.firestore.createId();
    this.firestore.doc(`eventList/${id}`).set({
      id,
      title,
      content,
      date
    });
  }

  getEvents() {
    return this.firestore.collection('eventList').valueChanges();
  }

  deleteEvent(id) {
    this.firestore.doc(`eventList/${id}`).delete();
  }
  
  addAbout(vision, objectives, mission) {
    const id = 'uni-about';
    this.firestore.doc(`aboutList/${id}`).set({
    id,
    vision,
	  objectives,
	  mission
    });
  }

  getAbout() {
    return this.firestore.collection('aboutList').valueChanges();
  }

  updateCount(num, value){
    if(num == 1){
      this.firestore.doc(`Count/News`).set({
        News:value
      });
    }
    
    else if(num == 2){
      this.firestore.doc(`Count/Videos`).set({
        Videos:value
      });
    }

    else if(num == 3){
      this.firestore.doc(`Count/Events`).set({
        Events:value
      });
    }
  }

  getCount(){
    return this.firestore.collection('Count').valueChanges();
  }
  
  addContact(email, number, lat, lng){
    const id = 'uni-contact';
    this.firestore.doc(`contactList/${id}`).set({
    id,
    email,
	  number,
	  lat,
	  lng
    });
  }

  getContact(){
    return this.firestore.collection('contactList').valueChanges();
  }
  
  addNews(title, description, image, imgname){
    const id = this.firestore.createId();
    let today= new Date();
    let date = formatDate(today, 'medium', 'en-US');
    this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      description,
      date,
      image,
	    imgname,
    });
  }

  updateNews(id, title, description, image, imgname, oldname) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`posts/${oldname}`).delete();
    let today= new Date();
    let date = formatDate(today, 'medium', 'en-US');
    this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      description,
      date,
      image,
	    imgname,
    });
  }

  getNews(){
    return this.firestore.collection('newsList').valueChanges();
  }
  
  deleteNews(newsid, imgid) {
	  const storageRef = firebase.storage().ref();
    storageRef.child(`posts/${imgid}`).delete();
    this.firestore.doc(`newsList/${newsid}`).delete();
  }

  saveSettings(university, collage, logo) {
    const id = 'data';
    this.firestore.doc(`settings/${id}`).set({
      id,
      university,
      collage,
      logo
    });
  }

  getSettings(){
    return this.firestore.collection('settings').valueChanges();
  }

  async login(email , password) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email , password);
  }

  deleteOldLogo(){
    const storageRef = firebase.storage().ref();
    storageRef.child(`settings/unilogo.png`).delete();
  }
}
