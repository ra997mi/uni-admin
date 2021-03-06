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
import { SettingsComponent } from '../../settings/settings.component';
import { DepartmentsComponent } from '../../departments/departments.component';
import { AddDepartmentComponent } from '../../add-department/add-department.component';
import { EditDepartmentComponent } from '../../edit-department/edit-department.component';
import { WeeklyComponent } from '../../weekly/weekly.component';
import { AddWeeklyComponent } from '../../add-weekly/add-weekly.component';
import { StudentComponent } from '../../student/student.component';
import { LecturesComponent } from '../../lectures/lectures.component';
import { AddLecturesComponent } from '../../add-lectures/add-lectures.component';
import { ViewLecturesComponent } from '../../view-lectures/view-lectures.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
    { path: 'add-article', component: AddArticleComponent, canActivate: [AuthGuard] },
    { path: 'edit-article', component: EditArticleComponent, canActivate: [AuthGuard] },
    { path: 'videos', component: VideosComponent, canActivate: [AuthGuard] },
    { path: 'add-video', component: AddVideoComponent, canActivate: [AuthGuard] },
    { path: 'edit-video', component: EditVideoComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
    { path: 'add-about', component: AddAboutComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactusComponent, canActivate: [AuthGuard] },
    { path: 'add-contact', component: AddContactComponent, canActivate: [AuthGuard] },
    { path: 'notify', component: NotifyComponent, canActivate: [AuthGuard] },
    { path: 'all-notify', component: AllNotifyComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
    { path: 'add-department', component: AddDepartmentComponent, canActivate: [AuthGuard] },
    { path: 'edit-department', component: EditDepartmentComponent, canActivate: [AuthGuard] },
    { path: 'weekly', component: WeeklyComponent, canActivate: [AuthGuard] },
    { path: 'add-weekly', component: AddWeeklyComponent, canActivate: [AuthGuard] },
    { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
    { path: 'lectures', component: LecturesComponent, canActivate: [AuthGuard] },
    { path: 'add-lectures', component: AddLecturesComponent, canActivate: [AuthGuard] },
    { path: 'view-lectures', component: ViewLecturesComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/dashboard' }
];
