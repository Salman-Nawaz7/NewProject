import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  router=inject(Router);
logout(){
localStorage.removeItem('myemail')
this.router.navigateByUrl('/login')
}
}
