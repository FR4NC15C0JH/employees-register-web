import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LOCAL_HOST } from './link';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post(`${LOCAL_HOST}/api/auth`, user);
  }

  createOrUpdate(user: User){
    if(user.id != null && user.id != ''){
      return this.http.put(`${LOCAL_HOST}/api/user`, user);
    }else {
      user.id = null;
      return this.http.post(`${LOCAL_HOST}/api/user/create`, user);
    }
  }

  findAll(page:number,count:number){
    return this.http.get(`${LOCAL_HOST}/api/user/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${LOCAL_HOST}/api/user/${id}`);
  }  
}
