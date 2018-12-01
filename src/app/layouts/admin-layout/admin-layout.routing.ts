import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';

import { ArticlesComponent } from '../../articles/articles.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AddArticleComponent } from '../../add-article/add-article.component';
import { EditArticleComponent } from '../../edit-article/edit-article.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard',      component: DashboardComponent, canActivate: [ AuthGuard]},
    { path: 'articles',      component: ArticlesComponent, canActivate: [ AuthGuard]},
    { path: 'add-article',      component: AddArticleComponent, canActivate: [ AuthGuard]},
    { path: 'edit-article',      component: EditArticleComponent, canActivate: [ AuthGuard]},
];
