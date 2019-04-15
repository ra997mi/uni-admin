import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ArticlesComponent } from '../../articles/articles.component';
import { AddArticleComponent } from '../../add-article/add-article.component';
import { EditArticleComponent } from '../../edit-article/edit-article.component';
import { VideosComponent } from '../../videos/videos.component';
import { AddVideoComponent } from '../../add-video/add-video.component';
import { EditVideoComponent } from '../../edit-video/edit-video.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { AboutComponent } from '../../about/about.component';
import { ContactusComponent } from '../../contactus/contactus.component';
import { AddAboutComponent } from '../../add-about/add-about.component';
import { AddContactComponent } from '../../add-contact/add-contact.component';
import { NotifyComponent } from '../../notify/notify.component';
import { AllNotifyComponent } from '../../all-notify/all-notify.component';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { SettingsComponent } from '../../settings/settings.component';
import { ArticleViewComponent } from '../../article-view/article-view.component';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';
import { DepartmentsComponent } from '../../departments/departments.component';
import { AddDepartmentComponent } from '../../add-department/add-department.component';
import { EditDepartmentComponent } from '../../edit-department/edit-department.component';
import { WeeklyComponent } from '../../weekly/weekly.component';
import { AddWeeklyComponent } from '../../add-weekly/add-weekly.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    YoutubePlayerModule,
    NgxSpinnerModule,
    NgxTrumbowygModule.withConfig({
      lang: 'ar',
      svgPath: '/assets/icons.svg',
      removeformatPasted: true,
      autogrow: true,
      btns: [
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
        ['fullscreen'],
        ['insertImage']
      ],
      events: {}
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlBIqwojwhPE-xqN-M8qTQXiyKvgqyhaw'
    })
  ],
  declarations: [
  DashboardComponent,
  ArticlesComponent,
  AddArticleComponent,
  EditArticleComponent,
  VideosComponent,
  AddVideoComponent,
  EditVideoComponent,
  AboutComponent,
  ContactusComponent,
  AddAboutComponent,
  AddContactComponent,
  NotifyComponent,
  AllNotifyComponent,
  ConfirmDeleteComponent,
  ArticleViewComponent,
  SettingsComponent,
  DepartmentsComponent,
  AddDepartmentComponent,
  EditDepartmentComponent,
  WeeklyComponent,
  AddWeeklyComponent
  ],
  entryComponents:[ConfirmDeleteComponent, ArticleViewComponent]
})

export class AdminLayoutModule {}
