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
import { EditorModule } from '@tinymce/tinymce-angular';

import {ToastModule} from 'primeng/toast';
import { YoutubePlayerModule } from 'ngx-youtube-player';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
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
    EditorModule,
	YoutubePlayerModule,
	ToastModule,
  ],
  declarations: [
  DashboardComponent,
  ArticlesComponent,
  AddArticleComponent,
  EditArticleComponent,
  VideosComponent,
  AddVideoComponent,
  EditVideoComponent
  ]
})

export class AdminLayoutModule {}
