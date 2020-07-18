import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {  Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //username : FormControl;
  form : FormGroup;
  constructor(private loginService: LoginService,
              private cookie: CookieService,
              private router: Router ) { }

  ngOnInit(): void {
    //this.username = new FormControl('', Validators.required)
    this.form = new FormGroup({
      username: new FormControl('', Validators.required)
    })
  }

  submit(){
    console.log(this.form.value.username)
    this.loginService.postLogin(this.form.value.username).subscribe(
      (user) => {
        // Adding User to Cookies
        this.cookie.set('UserId', String(user.id));
        return this.router.navigate(['']);
      },
      (err)=> console.error(err),

    )
    //this.username.reset()
  }
}
