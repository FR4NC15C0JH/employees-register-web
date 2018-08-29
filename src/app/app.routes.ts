import { Routes, RouterModule} from "@angular/router";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { LoginComponent } from "./components/security/login/login.component";
import { AuthGuard } from "./components/security/auth.guard";
import { DepartamentNewComponent } from "./components/departament-new/departament-new.component";

export const ROUTES: Routes = [
    { path: 'user-profile/:id' , component : UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'departament-new' , component : DepartamentNewComponent, canActivate: [AuthGuard] },
    { path: 'login', component : LoginComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);