import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Inject } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
const STORAGE_KEY = 'local_user';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

show: boolean;

password() {
    this.show = !this.show;
}

  constructor(private afAuth: AngularFireAuth,
    private newsService: NewsService, private router: Router,
    @Inject(SESSION_STORAGE) private storage: StorageService,
   private messageService: MessageService,
   private spinnerService: Ng4LoadingSpinnerService) {
    this.show = false;
   }

   showspin(){
    this.spinnerService.show();
   }

  signIn(f) {
    this.newsService.login(f.value.email, f.value.password).then((user) => {
      this.storage.set(STORAGE_KEY, this.afAuth.auth.currentUser);
      this.router.navigate(['dashboard']);
      this.spinnerService.hide();
    }, (err) => {
        this.messageService.add({severity:'warn', summary:'خطأ', detail:'البريد الالكتروني او كلمة المرور غير صحيحة',life: 5000});
        this.spinnerService.hide();
    });
  }
}
