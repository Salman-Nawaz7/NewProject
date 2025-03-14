import { Component, inject } from '@angular/core';
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

export class LoginComponent {
  email: string = "";
  password: string = "";
  check: any;
  count: any;
  test: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  myemail: any[] = JSON.parse(localStorage.getItem('myemail') || '[]');
  convertuser: string = JSON.stringify(this.test);
  router=inject(Router);

  componentname: string = "login";

  // ngOnInit(): void {
  //   this.changecomponent();
  // }
register(){
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

        this.router.navigateByUrl('/profile')

        break
      }
    }
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

}
