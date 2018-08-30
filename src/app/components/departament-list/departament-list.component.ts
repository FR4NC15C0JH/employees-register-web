import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ResponseApi } from '../../model/response-api';
import { DepartamentService } from '../../services/departament.service';

@Component({
  selector: 'app-departament-list',
  templateUrl: './departament-list.component.html',
  styleUrls: ['./departament-list.component.css']
})
export class DepartamentListComponent implements OnInit {

  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  shared: SharedService;
  message: {};
  classCss: {};
  listDepartament = [];

  constructor(
    private messageService: MessageService,
    private departamentService: DepartamentService,
    private router: Router
  ) { this.shared = SharedService.getInstance(); }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page:number,count:number){
    this.departamentService.findAll(page,count).subscribe((responseApi:ResponseApi) => {
      this.listDepartament = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  delete(id:string){
    this.messageService.confirm('Do you want to delete the email ?')
      .then((candelete:boolean) => {
          if(candelete){
            this.message = {};
            this.departamentService.delete(id).subscribe((responseApi:ResponseApi) => {
              this.showMessage({
                type: 'success',
                text: 'Record deleted'
              });
              this.findAll(this.page,this.count);
            }, err => {
              this.showMessage({
                type: 'error',
                text: err['error']['errors'][0]
              });
          });
        }
    });
  }

  setNextPage(event:any){
    event.preventDefault();
    if(this.page+1 < this.pages.length){
      this.page = this.page +1;
      this.findAll(this.page,this.count);
    }
  }

  setPreviousPage(event:any){
    event.preventDefault();
    if(this.page > 0){
      this.page = this.page -1;
      this.findAll(this.page,this.count);
    }
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
  }

  private showMessage(message: {type:string, text:string}): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type:string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-'+type] = true;
  }
}
