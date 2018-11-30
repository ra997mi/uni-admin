import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged((loggedin) => {
        if (loggedin) {
          resolve(loggedin);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  logout(): Promise<any> {
    return firebase.auth().signOut();
  }
}
