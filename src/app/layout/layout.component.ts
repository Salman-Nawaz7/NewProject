import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink,MatMenuModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router=inject(Router);

  profile(){
    this.router.navigateByUrl('/profile')
  }
  logout(){
  localStorage.removeItem('myemail')
  this.router.navigateByUrl('/login')
  }
}
