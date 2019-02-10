import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ArticlesComponent } from '../../articles/articles.component';
import { AddArticleComponent } from '../../add-article/add-article.component';
import { EditArticleComponent } from '../../edit-article/edit-article.component';
import { VideosComponent } from '../../videos/videos.component';
import { AddVideoComponent } from '../../add-video/add-video.component';
import { EditVideoComponent } from '../../edit-video/edit-video.component';
import { AboutComponent } from '../../about/about.component';
import { AddAboutComponent } from '../../add-about/add-about.component';
import { ContactusComponent } from '../../contactus/contactus.component';
import { AddContactComponent } from '../../add-contact/add-contact.component';
import { NotifyComponent } from '../../notify/notify.component';
import { AllNotifyComponent } from '../../all-notify/all-notify.component';


export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent, canActivate: [ AuthGuard]},
    { path: 'articles',      component: ArticlesComponent, canActivate: [ AuthGuard]},
    { path: 'add-article',      component: AddArticleComponent, canActivate: [ AuthGuard]},
    { path: 'edit-article',      component: EditArticleComponent, canActivate: [ AuthGuard]},
	{ path: 'videos',      component: VideosComponent, canActivate: [ AuthGuard]},
	{ path: 'add-video',      component: AddVideoComponent, canActivate: [ AuthGuard]},
    { path: 'edit-video',      component: EditVideoComponent, canActivate: [ AuthGuard]},
    { path: 'about',      component: AboutComponent, canActivate: [ AuthGuard]},
	{ path: 'add-about',      component: AddAboutComponent, canActivate: [ AuthGuard]},
    { path: 'contact',      component: ContactusComponent, canActivate: [ AuthGuard]},
    { path: 'add-contact',      component: AddContactComponent, canActivate: [ AuthGuard]},
    { path: 'notify',      component: NotifyComponent, canActivate: [ AuthGuard]},
    { path: 'all-notify',      component: AllNotifyComponent, canActivate: [ AuthGuard]}
];
