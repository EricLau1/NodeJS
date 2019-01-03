import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LoginService } from '../shared/login.service';
import { UsersService, User } from '../shared/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cargos = [ "CEO", "CFO", "CHRO", "CIO", "CKO", "CMO", "COO", "CRM", "CRO", "CTO"];

  modelLogin: User = null ;
  modelUser: User = null;

  displayMessage = false;
  mensagem = "";
  alert = "";

  constructor(public loginService: LoginService, private usersService: UsersService) { }

  ngOnInit() {

    this.modelLogin = new User();
    this.modelUser = new User();

    console.log(this.modelUser);

  }

  login(form: FormGroup) {

    if(form.valid) {

      const email = form.value.email;
      const password = form.value.password;

      this.loginService.signin(email, password)
        .subscribe((response) => {
            this.usersService.setToken(response);
            console.log(this.usersService.getToken());
            this.flash("login realizado com sucesso!", 'success');
        });

    }

  }

  register(form: FormGroup) {

    if(form.valid) {
      this.usersService.signup(form.value)
        .subscribe(response => {

          console.log(response);

          if(response["statusCode"] == 201) {
            this.flash("conta criada com sucesso! Faça o login");
          } else {
            this.flash('Oops! Ocorreu um erro. Verifique se o email já não foi cadastrado.', 'warning');
          }
        },
        error => {
          console.error(error);
        });
    }

  }

  flash(message, alert = 'info') {
    this.mensagem = message;
    this.alert = alert;
    this.displayMessage = true;
  }

}
