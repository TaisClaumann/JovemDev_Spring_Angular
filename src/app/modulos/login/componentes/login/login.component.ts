import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login = {} as Login;

  constructor(private service: LoginService, private router: Router) {}

  public getToken(){
    if(this.login){
      this.service.getToken(this.login).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
