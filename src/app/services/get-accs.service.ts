import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseURL';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GetAccsService {

  constructor( private  http: HttpClient) { }

  getAllAccs(id: number): Observable<User[]>{
    return this.http.get<User[]>(baseUrl + 'chat/allchats?currentId='+String(id))

  }

  getUser(id : number) : Observable<User>{
    return this.http.get<User>(baseUrl + 'chat/getUser?userid='+String(id))
  }
}
