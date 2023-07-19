import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) {}

  public token: string = "Bearer ";

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    responseType: 'text' as 'json'
  }

  public getToken(email: string, password: string){
    let url = "http://localhost:8099/auth/token";
    let userLogin = {
      email: email,
      password: password
    }
    this.http.post<string>(url, userLogin, this.httpOptions).subscribe((data) => {
      this.token += data;
    });
  }
}
