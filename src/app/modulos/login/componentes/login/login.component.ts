import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login = {} as Login;
  public token: string = "Bearer ";

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    responseType: 'text' as 'json'
  }

  constructor(private http: HttpClient) {}

  public getToken(){
    let url = "http://localhost:8099/auth/token";
    let userLogin = {
      email: this.login.email,
      password: this.login.password
    }
    this.http.post<string>(url, userLogin, this.httpOptions).subscribe((data) => {
      this.token += data;
    });
  }

  public enviar(){
    
  }
}
