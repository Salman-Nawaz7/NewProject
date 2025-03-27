declare var google:any;
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'})

export class AuthService {
constructor(){}
router=inject(Router);
signout(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
}
}