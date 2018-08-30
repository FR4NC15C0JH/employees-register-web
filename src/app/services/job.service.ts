import { Injectable } from '@angular/core';
import { LOCAL_HOST } from './link';
import { HttpClient } from '@angular/common/http';
import { Job } from '../model/job';

@Injectable()
export class JobService {

  constructor(private http: HttpClient) { }

  create(job: Job){
    job.id = null;
    return this.http.post(`${LOCAL_HOST}/api/job`,job);
  }

  findAll(page:number,count:number){
    return this.http.get(`${LOCAL_HOST}/api/job/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${LOCAL_HOST}/api/job/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${LOCAL_HOST}/api/job/${id}`);
  }
}
