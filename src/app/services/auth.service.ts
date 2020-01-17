import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggued: boolean;

  set isLoggued(value: boolean) {
    this._isLoggued = value;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private route: Router
  ) {
    this._isLoggued = false;
    // Compruebo si estoy subscrito
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this._isLoggued = true;
        this.route.navigate([this.route.getCurrentNavigation()]);
      }
    })
  }

  /**
   * Compruebo si estoy logueado
   */
  isAuthenticated() {
    return this._isLoggued;
  }

  /**
   * Me logueo dado un email y contraseña, devuelve una promesa
   * @param email email del usuario
   * @param pass pass del usuario
   */
  login(email: string, pass: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  /**
   * Nos desploguea de la aplicacion
   */
  logout() {
    this.afAuth.auth.signOut();
    this._isLoggued = false;
    this.route.navigate(['/events']);
  }

  /**
   * Comprueba si el usuario existe, dado un email
   * @param email email del usuario a comprobar
   */
  checkAccount(email) {
    return this.afAuth.auth.isSignInWithEmailLink(email);
  }

  /**
   * Devuelve el usuario actual
   */
  currentUser() {
    if (this.afAuth.auth.currentUser) {
      return this.afAuth.auth.currentUser.email;
    }
    return '';
  }

  /**
   * Crea una cuenta dado un email y un pass. Devuelve una promesa
   * @param email email del usuario a crear
   * @param pass pass del usuario a crear
   */
  createAccount(email: string, pass: string) {

    // Chequeo si la cuenta existe
    if (this.checkAccount(email)) {
      return new Promise((resolve, reject) => {
        reject('El usuario ya existe')
      })
    } else {
      // Creo la cuenta y devuelvo una promesa con el estado
      return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then(authState => {
        return authState;
      }).catch(error => {
        throw error;
      })
    }

  }

}

