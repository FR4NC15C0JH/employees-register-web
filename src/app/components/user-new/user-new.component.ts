import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user';
import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
import { DepartamentService } from '../../services/departament.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseApi } from '../../model/response-api';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  user = new User('','','','','',null,null,null);
  shared: SharedService;
  message: {};
  classCss: {};
  listDepartament = [];
  listJobs = [];

  constructor(
    private userService: UserService,
    private departamentService: DepartamentService,
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.shared = SharedService.getInstance();
   }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
    this.findAllDepartament();
    this.findAllJobs();
  }

  findById(id:string){
    this.userService.findById(id).subscribe((responseApi:ResponseApi) => {
      this.user = responseApi.data;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register(){
    this.message = {};
    this.userService.createOrUpdate(this.user).subscribe((responseApi: ResponseApi) => {
      this.user = new User(null,'','','','',null,null,null);
      let userReturn : User = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${userReturn.name} successfully`
      });
      this.router.navigate(['/login']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  onFileChange(event): void{
    if(event.target.files[0].size > 2000000){
      this.showMessage({
        type: 'error',
        text: 'Maximum image size is 2 MB'
      });
    } else {
      this.user.image = '';
      var reader = new FileReader();
      reader.onloadend = (e: Event) => {
        this.user.image = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  findAllDepartament(){
    this.departamentService.list().subscribe((responseApi: ResponseApi) => {
      this.listDepartament = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  findAllJobs(){
    this.jobService.list().subscribe((responseApi: ResponseApi) => {
      this.listJobs = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  redirectLogin(){
    this.router.navigate(['/login']);
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 5000);
  }

  private buildClasses(type: string): void {
     this.classCss = {
       'alert': true
     }
     this.classCss['alert-'+type] =  true;
  }

}
