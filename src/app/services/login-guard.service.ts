import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{


  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  canActivate() {

    // Sino estoy logueado, vuelvo al login
    if (!this.authService.isAuthenticated()) {
      console.log("No estas logueado");
      this.route.navigate(['/login'])
      return false;
    }

    return true;
  }

}
