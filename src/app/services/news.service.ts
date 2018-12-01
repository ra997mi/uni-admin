import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { newsdatatype } from '../services/newsdatatype';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth) {}
  
  addNews(title: string, description: string, date: string, image: string): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      description,
      date,
      image,
    });
  }
  updateNews(id, title, description, date, image): Promise<void> {
     return this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      description,
      date,
      image,
    });
  }
  getNews(): AngularFirestoreCollection<newsdatatype> {
    return this.firestore.collection('newsList');
  }
  
  deleteNews(newsid: string): Promise<void> {
    return this.firestore.doc(`newsList/${newsid}`).delete();
  }
  async login(email , password) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email , password)
      .then(res => {
      });
  }
}
