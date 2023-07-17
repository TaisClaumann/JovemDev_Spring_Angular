import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { FormComponent } from '../componentes/form/form.component';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService{

  public users !: User[];

  public emiteNome = new EventEmitter();
  public emiteEmail = new EventEmitter();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    let url = `http://localhost:8099/user`;
    return this.http.get<User[]>(url);
  }

  getUsersByName(nome: string): Observable<User[]> {
    let url = `http://localhost:8099/user/like/${nome}`
    return this.http.get<User[]>(url);
  }

  getUsersByEmail(email: string): Observable<User> {
    let url = `http://localhost:8099/user/email/${email}`
    return this.http.get<User>(url);
  }

  public getNome(nome: string) {
    this.emiteNome.emit(nome)
  }

  public getEmail(email: string){
    this.emiteEmail.emit(email);
  }
}
