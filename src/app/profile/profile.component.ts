import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  email: string = "";
  password: string = "";
  username: string = "";
  contact: string = "";
  city: string = "";
  image: File | undefined;
  status: number = 0;
  count: number = 0;
  questions: string = "";
  yourNewData:any = [];
  
  componentname: string = "profile";
  newobject: object = {};
  defaultImage: string = "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid";
  test: any[] = JSON.parse(localStorage.getItem('users') || '[]');
  myemail: any[] = JSON.parse(localStorage.getItem('myemail') || '[]');
  convertuser: string = JSON.stringify(this.test);

  index:any;
  

  onFileChanged(event:any) {
    this.image = event.target.files[0]
    console.log(this.image);
  }













  changecomponent(componentname: string) {
    this.componentname = componentname;
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
        if (this.count == i) {
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

  ngOnInit() {
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
        // if (this.image == "N/a") {
        //   this.image = this.defaultImage;
        // }


        break
      }
    }
  }
  

}
