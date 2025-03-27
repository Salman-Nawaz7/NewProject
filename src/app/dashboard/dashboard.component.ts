import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from "../profile/profile.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatMenuModule, ProfileComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 
  email: string = "email";
  password: string = "";
  username: string = "";
  contact: string = "";
  city: string = "";
  image: string = "";
  status: number = 0;
  count: number = 0;
  questions: string = "";
  yourNewData: any = [];
  componentname: string = "tabledata";
  newobject: object = {};
  updatedobject: object = {};
  index: any;
  check: number = 0;
  defaultImage: string = "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid";
  test: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  myemail: any[] = JSON.parse(localStorage.getItem('myemail') || '[]');
  userinfo: any[] = JSON.parse(localStorage.getItem('userinfo') || '[]');
  convertuser: string = JSON.stringify(this.test);

  ngOnInit(): void {
    for (const element of this.test) {
      this.count;
      console.log(element.email);
      if (element.email == this.myemail) {
        this.email = element.email;
        this.password = element.password;
        this.username = element.profile.username;
        this.contact = element.profile.contact;
        this.city = element.profile.city;
        this.image = element.profile.image;
        this.status = element.status;
        if (this.image == "N/a") {
          this.image = this.defaultImage;
        }


        break
      }
    }
  }

  async changecomponent(componentname: string, index: any) {
    await Swal.fire({
      title: "Do you want to remove the item?",
      showDenyButton: true,
      showCancelButton: true,
      denyButtonColor: '#abdcf7',
      showConfirmButton: false,
      denyButtonText: "Edit",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.componentname = componentname;
        this.index = index;
        for (let i = 0; i < this.test.length; i++) {
          const element = this.test[i];
          if (this.index == i) {
            this.email = element.email;
            this.password = element.password;
            this.username = element.profile.username;
            this.contact = element.profile.contact;
            this.city = element.profile.city;
            this.image = element.profile.image;
            this.status = element.status;
            if (this.image == "N/a") {
              this.image = this.defaultImage;
            }


            break
          }
        }

      }
    });

  }
  router = inject(Router);
auth=inject(AuthService);

  profile() {
    this.router.navigateByUrl('/profile')
  }
  logout() {
    this.auth.signout();
    localStorage.removeItem('myemail')
    localStorage.removeItem('userinfo')
    this.router.navigateByUrl('/login')
  }
  async savechanges() {

    if (this.email.includes('@') == true && this.email.endsWith('.com') && this.email.length > 15 && this.password.length > 5) {
      this.newobject = {
        "email": this.email, "password": this.password, "status": this.status, "profile": {
          "username": this.username, "contact": this.contact, "city": this.city, "image": this.image
        }
      };
      for (let i = 0; i < this.test.length; i++) {
        const element = this.test[i];
        console.log(element);
        if (this.index == i) {
          this.yourNewData.push(this.newobject);
        } else {
          this.yourNewData.push(element);
        }


      }
      localStorage.setItem("users", JSON.stringify(this.yourNewData));
      await Swal.fire("Updated!", "", "success");
      location.reload();

    } else {

      await Swal.fire("Error!", "please correct the email and password length...", "error");
    }

  }

  async deleteitem(index: any) {


    await Swal.fire({
      title: "Do you want to remove the item?",
      showDenyButton: true,
      denyButtonColor: '#f7abb4',
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: "Remove",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.index = index;
        for (let i = 0; i < this.test.length; i++) {
          const element = this.test[i];
          console.log(element);
          if (this.index != i) {
            this.yourNewData.push(element);
          }
          if (element.email == this.myemail && this.index == i) {
            this.check = 1;
          }


        }
        localStorage.setItem("users", JSON.stringify(this.yourNewData));
        if (this.check == 1) {
          localStorage.removeItem("myemail")
        }

        await Swal.fire("Removed!", "", "success");
        location.reload();
      }
    });
  }


}
