import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { flush } from '@angular/core/testing';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        canActivate:[authGuard],
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                
            },
            {
                path:'profile',
                component:ProfileComponent,
                
            }

        ]
    }
];
