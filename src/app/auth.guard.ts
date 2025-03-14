import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const checkMail=localStorage.getItem('myemail');
  const router=inject(Router)
  if(checkMail!=null){
    return true;
  }else{
    router.navigateByUrl('/login')
    return false;

  }
  
};
