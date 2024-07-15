import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: ProfileComponent },
];
