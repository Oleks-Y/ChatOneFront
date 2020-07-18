import { Injectable } from '@angular/core';

import {User} from '../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {baseUrl} from '../shared/baseURL';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http : HttpClient,
    //proccess http will be added later
  ) { }

  postLogin(username: string): Observable<User>{
    console.log(baseUrl + 'auth/login?username='+username)
      return this.http.get<User>(baseUrl + 'auth/login?username='+username)
  }
}
