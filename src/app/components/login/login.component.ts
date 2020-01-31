import { User } from './../../models/user.models.ts';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DdrToastService } from 'ddr-toast';

@Component({
  selector: 'ddr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(
    private authService: AuthService,
    private route: Router,
    private toastService: DdrToastService
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  /**
   * Compruebo si el login es correcto
   */
  checkLogin() {


    // Nos logueamos 
    this.authService.login(this.user.email, this.user.password).then(state => {

      this.toastService.addSuccessMessage('Éxito', '¡Te has logueado!')

      console.log(state);
      this.route.navigate(['/manage-coupons'])

    }, error => {
      this.toastService.addErrorMessage('Error', 'El usuario o la contraseña son incorrectas');
      console.error(error);
    })

  }
}
