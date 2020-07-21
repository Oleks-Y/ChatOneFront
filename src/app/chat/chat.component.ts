import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ChatService} from '../services/chat.service';
import {CookieService} from 'ngx-cookie-service';
import {Conversation} from '../models/Conversation';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

interface ngAfterContentInit {
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, ngAfterContentInit {
  @ViewChild('scrollMe' ) private myScrollContainer : ElementRef;


  id : number
  currentUserId : number
  conversations : Conversation[]
  form : FormGroup
  show: boolean = true;
  subscription : Subscription
  constructor( private activatedRoute: ActivatedRoute,
               private chat : ChatService,
               private cookie: CookieService,
               private cdr: ChangeDetectorRef,
               private router : Router) { }

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
    this.scrollToBottom();
  }

  loadConversatinons(currentUserId, id){
    this.chat.getChat(currentUserId, id)
      .subscribe(convs=> {this.conversations = convs},
                 err=>console.error(err))
  }
  ngAfterContentInit(){
    this.scrollToBottom()
  }
  sendMessage() {
      this.chat.sendMessage(this.currentUserId, this.id, this.form.value.message)
        .subscribe(
          res => console.log('Debug.Response from the SendMEssage'),
          err => console.error(err),
          ()=> {this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                          this.router.navigate(['chat',this.id]);
                          });
          }
        )
     this.form.reset()


  }

  t
  reload(){
    this.show = false;
    setTimeout(()=> this.show = true)
  }

  private scrollToBottom() {
    try{
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
    }catch (error) {
      //something
    }
  }
}
