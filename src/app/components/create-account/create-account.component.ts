import { User } from './../../models/user.models.ts';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DdrToastService } from 'ddr-toast';

@Component({
  selector: 'ddr-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  public user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: DdrToastService
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  addUser() {

    if (this.user.password != this.user.confirm) {
      this.toastService.addErrorMessage('Error', 'Las contraseñas no coinciden');
    } else {
      this.authService.createAccount(this.user.email, this.user.password).then(success => {
        console.log(success);
        this.router.navigate(['/login']);
      }).catch(error => {
        console.error(error);
      })
    }



  }
}
