import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AutoComponent } from './pages/auto/auto.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'autos',
        component: AutoComponent,
        canActivate: [authGuard],
    },
    {
        path: 'marcas',
        component: MarcaComponent,
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: ''
    }
];
