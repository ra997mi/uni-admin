import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';

import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { StorageServiceModule } from 'angular-webstorage-service';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { NewsService } from './services/news.service';
import { AuthGuard } from './core/auth.guard';
import { APP_BASE_HREF } from '@angular/common';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { NotifyComponent } from './notify/notify.component';

import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

import { YoutubePlayerModule } from 'ngx-youtube-player';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
	EditorModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    StorageServiceModule,
	AngularFireDatabaseModule,
	AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
	ToastModule,
    YoutubePlayerModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    NotifyComponent
  ],
  providers: [MessageService,DatePipe, NewsService, AuthGuard, {provide: APP_BASE_HREF, useValue : ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
