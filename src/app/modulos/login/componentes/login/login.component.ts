import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login = {} as Login;

  constructor(private service: LoginService) {}

  public getToken(){
    this.service.getToken(this.login).subscribe(() => {
    });
  }
}
