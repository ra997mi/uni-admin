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
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

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
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    YoutubePlayerModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
    closeButton: true,
    timeOut: 5000,
    positionClass: 'toast-bottom-center',
    preventDuplicates: true,
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  providers: [DatePipe, NewsService, AuthGuard, {provide: APP_BASE_HREF, useValue : ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
