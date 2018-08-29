import { Injectable } from '@angular/core';
import { Departament } from '../model/departament';
import { HttpClient } from '@angular/common/http';
import { LOCAL_HOST } from './link';

@Injectable()
export class DepartamentService {

  constructor(private http: HttpClient) { }

  create(departament: Departament){
    departament.id = null;
    return this.http.post(`${LOCAL_HOST}/api/departament`,departament);
  }

  findAll(page:number,count:number){
    return this.http.get(`${LOCAL_HOST}/api/departament/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${LOCAL_HOST}/api/departament/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${LOCAL_HOST}/api/departament/${id}`);
  }
}
