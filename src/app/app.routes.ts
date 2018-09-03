import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule} from "@angular/router";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { LoginComponent } from "./components/security/login/login.component";
import { AuthGuard } from "./components/security/auth.guard";
import { DepartamentNewComponent } from "./components/departament-new/departament-new.component";
import { DepartamentListComponent } from "./components/departament-list/departament-list.component";
import { JobNewComponent } from "./components/job-new/job-new.component";
import { JobListComponent } from "./components/job-list/job-list.component";
import { UserNewComponent } from "./components/user-new/user-new.component";

export const ROUTES: Routes = [
    { path: '' , component : HomeComponent, canActivate: [AuthGuard] },
    { path: 'user-profile/:id' , component : UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component : LoginComponent },
    { path: 'user-new' , component : UserNewComponent },
    { path: 'departament-new' , component : DepartamentNewComponent, canActivate: [AuthGuard] },
    { path: 'departament-list' , component : DepartamentListComponent, canActivate: [AuthGuard] },
    { path: 'job-new' , component : JobNewComponent, canActivate: [AuthGuard] },
    { path: 'job-list' , component : JobListComponent, canActivate: [AuthGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);