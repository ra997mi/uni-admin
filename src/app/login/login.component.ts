import { AngularFireAuth } from 'angularfire2/auth';
import { Component, Inject } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

// variable
show: boolean;

// click event function toggle
password() {
    this.show = !this.show;
}

  constructor(public afAuth: AngularFireAuth,
    public newsService: NewsService, private router: Router,
     @Inject(SESSION_STORAGE) private storage: StorageService,
	 private messageService: MessageService) {
    this.show = false;
   }

  signIn(f) {
    this.newsService.login(f.value.email, f.value.password).then((user) => {
      this.storage.set(STORAGE_KEY, this.afAuth.auth.currentUser);
      this.router.navigate(['dashboard']);
    }, (err) => {
        this.messageService.add({severity:'warn', summary:'خطأ', detail:'البريد الالكتروني او كلمة المرور غير صحيحة',life: 5000});
    });
  }
}
