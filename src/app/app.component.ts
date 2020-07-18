import { Component } from '@angular/core';
//My imports 
import {LoginService} from '../app/services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    LoginService
  ],
})
export class AppComponent {
  title = 'ChatOneFront';
}
