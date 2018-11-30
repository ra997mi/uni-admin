import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';

import { ArticlesComponent } from '../../articles/articles.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'articles',      component: ArticlesComponent, canActivate: [ AuthGuard]}

];
