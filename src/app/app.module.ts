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
import { AngularFireModule } from '@angular/fire/';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NewsService } from './services/news.service';
import { AuthGuard } from './core/auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  imports: [
    Ng4LoadingSpinnerModule.forRoot(),
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
    YoutubePlayerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  providers: [MessageService,DatePipe, NewsService, AuthGuard, {provide: APP_BASE_HREF, useValue : ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
