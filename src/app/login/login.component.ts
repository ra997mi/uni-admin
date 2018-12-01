import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, Inject } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
    public newsService: NewsService, private router: Router,
     @Inject(SESSION_STORAGE) private storage: StorageService) {}

  ngOnInit() {}

  signIn(f) {
    this.newsService.login(f.value.email, f.value.password).then((user) => {
      this.storage.set(STORAGE_KEY, this.afAuth.auth.currentUser);
      this.router.navigate(['dashboard']);
    }, (err) => {
        alert("البريد الالكتروني او كلمة المرور غير صحيحة");
    });
  }

}
