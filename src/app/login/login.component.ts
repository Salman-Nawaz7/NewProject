declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  check: any;
  count: any;
  newobject: object = {};
  test: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  myemail: any[] = JSON.parse(localStorage.getItem('myemail') || '[]');
  convertuser: string = JSON.stringify(this.test);
  router = inject(Router);

  componentname: string = "login";


  register() {
    this.router.navigateByUrl('/register');
  }
  submitdata() {
    this.check = 0;
    this.count = 0;
    for (const element of this.test) {
      this.count++;
      console.log(element.email);
      if (element.email == this.email && element.password == this.password) {

        this.test[this.count - 1].status = 1;
        localStorage.setItem('users', JSON.stringify(this.test));
        localStorage.setItem('myemail', JSON.stringify(element.email));
        alert("Successfully Login..." + this.email + element.status)
        this.check = 1;
        this.componentname = "userdata"

        this.router.navigateByUrl('/dashboard')

        break
      }
    }
    const logincheck = sessionStorage.getItem("loginUser")
    // if(logincheck){
    //   this.router.navigateByUrl('/dashboard')
    // }
    if (this.check == 0) {
      alert("Email or Passowrd is Wrong")

    }

  }



  changecomponent() {
    for (const element of this.test) {
      this.count++;
      console.log(element.email);
      if (element.email == this.myemail && element.status == 1) {

        this.componentname = "userdata"

        break
      }
    }
  }

  ngOnInit(): void {

    google.accounts.id.initialize({
      client_id: '59814451099-7rmuqjnobsll5pi8at1g18oqmjustefp.apps.googleusercontent.com',
      callback: (resp: any) => this.handlelogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_black',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodetoken(token: any) {
    return JSON.parse(atob(token.split(".")[1]))
  }

  handlelogin(response: any) {
    if (response) {
      const payload = this.decodetoken(response.credential);
      console.log(payload)

      // add user data in localstorage
      localStorage.setItem("myemail", JSON.stringify(payload.email));

      for (const element of this.test) {
        console.log(element.email);

        if (element.email == payload.email) {
          this.check = 1;
          break
        }
      }
      if (this.check != 1) {
        this.newobject = {
          "email": payload.email, "password": "0000000", "status": 0, "profile": {
            "username": payload.name, "contact": "N/a", "city": "N/a", "image": payload.picture
          }
        }
        this.test.push(this.newobject);
        localStorage.setItem('users', JSON.stringify(this.test));
      }
      // -------------
      localStorage.setItem("userinfo", JSON.stringify(payload));
      this.router.navigateByUrl('/dashboard')
    }
  }

}
