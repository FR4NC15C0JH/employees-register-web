import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentUser } from '../../../model/currentUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('','','','','',null,null,'');
  shared: SharedService;
  message: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.shared = SharedService.getInstance();
   }

  ngOnInit() {    
  }

  login(){
    this.message = '';
    this.userService.login(this.user).subscribe((userAuthentication: CurrentUser) => {
      this.shared.token = userAuthentication.token;
      this.shared.user = userAuthentication.user;
      this.shared.user.profiles = this.shared.user.profiles.substring(5);
      this.shared.showTemplate.emit(true);
      //this.router.navigate(['/']);
      this.redirectUserProfile(this.shared.user.id);
    }, erro => {
      this.shared.token = null;
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });
  }

  redirectUserProfile(id:string){
    this.router.navigate(['/user-profile',id]);
  }

  redirectUserNew(){
    this.router.navigate(['/user-new']);
  }

  cancelLogin(){
    this.message = '';
    this.user = new User('','','','','',null,null,'');
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return{
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }
}
