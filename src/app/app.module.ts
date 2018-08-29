import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/security/login/login.component';
import { SharedService } from './services/shared.service';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { AuthGuard } from './components/security/auth.guard';
import { DepartamentNewComponent } from './components/departament-new/departament-new.component';
import { JobNewComponent } from './components/job-new/job-new.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { DepartamentListComponent } from './components/departament-list/departament-list.component';
import { DepartamentService } from './services/departament.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    UserProfileComponent,
    UserListComponent,
    UserNewComponent,
    HomeComponent,
    LoginComponent,
    DepartamentNewComponent,
    JobNewComponent,
    JobListComponent,
    DepartamentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [
    UserService,
    DepartamentService,
    SharedService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
