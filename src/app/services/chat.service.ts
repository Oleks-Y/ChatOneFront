import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Conversation} from '../models/Conversation';
import {Observable} from 'rxjs';
import {baseUrl} from '../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChat(currentUserId: number, contactId: number): Observable<Conversation[]>{
    return this.http.get<Conversation[]>(baseUrl+'chat/chatwith?contactId='+contactId+'&currentUserId='+currentUserId)
  }

  sendMessage(currentUserId: number, contactId: number, message: string): Observable<any>{
    let body = {
      contactId : contactId,
      currentUserId : currentUserId,
      message : message
    }
    console.log(JSON.stringify(body))
    return this.http.post(baseUrl+ 'chat/sendmessage',
                              body,
                        {headers:{'Content-Type': 'application/json'}} )
  }
}
