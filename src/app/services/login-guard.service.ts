import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  /**
   * Cada vez que entremos en una ruta ejecutara este codigo
   */
  canActivate() {

    // Sino esta autentificado, vuelvo al inicio
    if (!this.auth.isAuthenticated()) {
      console.log("No estas logueado");
      this.router.navigate(['/login'])

      return false;
    }

    return true;

  }


}