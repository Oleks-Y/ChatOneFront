import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ChatService} from '../services/chat.service';
import {CookieService} from 'ngx-cookie-service';
import {Conversation} from '../models/Conversation';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  id : number
  currentUserId : number
  conversations : Conversation[]
  form : FormGroup
  constructor( private activatedRoute: ActivatedRoute,
               private chat : ChatService,
               private cookie: CookieService) { }

  ngOnInit(): void {
    this.currentUserId = Number(this.cookie.get('UserId'))
    this.activatedRoute.paramMap.pipe(
      switchMap(params=> params.getAll('id')))
      .subscribe(data =>{ this.id = +data;
                                this.loadConversatinons(this.currentUserId, this.id);
                                })
    this.form = new FormGroup({
      message : new FormControl('', Validators.required)
    })
  }

  loadConversatinons(currentUserId, id){
    this.chat.getChat(currentUserId, id)
      .subscribe(convs=> {this.conversations = convs},
                 err=>console.error(err))
  }

  sendMessage() {

      this.chat.sendMessage(this.currentUserId, this.id, this.form.value.message)
        .subscribe(
          res => console.log('Debug.Response from the SendMEssage'),
          err => console.error(err),
        )
     this.form.reset()

  }
}
