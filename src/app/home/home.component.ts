import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { NavigationExtras, Router} from '@angular/router';
import {GetAccsService} from '../services/get-accs.service';
import {User} from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user : User
  chats : User[]
  constructor( private cookie: CookieService,
               private router : Router,
               private accs : GetAccsService) { }

  ngOnInit(): void {
    this.checkIfLogin();
    // Render home page



  }
  checkIfLogin(){
    var id = this.cookie.get('UserId')
    if(!id){
      // Routing to login
      this.router.navigate(['/login'])
    }
    else{
      this.accs.getUser(Number(id)).subscribe(
        user => this.user = user,
        err=> console.error(err))
      this.accs.getAllAccs(Number(id)).subscribe(
        chats => {this.chats = chats ; console.log('Debug.All chats',this.chats)},
        err => console.error(err))

    }
  }


}
