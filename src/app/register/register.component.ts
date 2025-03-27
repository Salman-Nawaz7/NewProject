import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { data2 } from '../interfcae/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  myemail: any[] = JSON.parse(localStorage.getItem('myemail') || '[]');
  user: data2 = new data2();
  router = inject(Router);

  check: any;
  test: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  newobject: object = {};

  ngOnInit(): void {
    if(this.myemail!=null){
      this.router.navigateByUrl('/dashboard');
    }
  }
  submitdata() {
    this.check = 0;
    if (this.user.email.includes('@') == true && this.user.email.endsWith('.com') && this.user.email.length > 15) {
      if (this.user.newpassword.length > 5) {
        if (this.user.newpassword == this.user.confirmpassword) {

          for (const element of this.test) {
            console.log(element.email);
            if (element.email == this.user.email) {
              alert("The Email is Already Exsist " + this.user.email)
              this.check = 1;
              break
            }
          }
          if (this.check != 1) {
            // this.newobject = { "email": this.user.email, "password": this.user.newpassword, "status": 0 };
            this.newobject = { "email": this.user.email, "password": this.user.newpassword, "status": 0, "profile":{"username": this.user.username, "contact": this.user.contact, "city": this.user.contact, "image": this.user.image
            } };
            this.test.push(this.newobject);
            localStorage.setItem('users', JSON.stringify(this.test));
            alert("Successfully Register...")
          }



        } else {
          alert("Password Not Match...")

        }
      } else {
        alert("Password Must Contain 6 Characters...")
      }

    } else {
      alert("Please Enter The Right Email...")
    }


  }
  login() {
    this.router.navigateByUrl('/login')
  }

}
