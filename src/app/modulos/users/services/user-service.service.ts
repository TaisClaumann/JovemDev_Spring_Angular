import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LoginService } from '../../login/services/login.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  public selectUserEvent = new EventEmitter();
  private usersSubject = new Subject<User[]>();
  public userSubject = new Subject<User>();

  private urlBase: string = 'http://localhost:8099/user';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public getUsers(): Observable<User[]> {
    this.http.get<User[]>(this.urlBase, this.getHttpOptions()).subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/like/${name}`;
    this.http.get<User[]>(url, this.getHttpOptions()).subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUserByEmail(email: string): Observable<User> {
    let url = `${this.urlBase}/email/${email}`;
    this.http.get<User>(url, this.getHttpOptions()).subscribe((user) => this.userSubject.next(user));
    return this.userSubject.asObservable();
  }

  public getUserById(id: number){
    let url = `${this.urlBase}/${id}`;
    this.http.get<User>(url, this.getHttpOptions()).subscribe((user) => this.userSubject.next(user));
    return this.userSubject.asObservable();
  }

  public insert(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, JSON.stringify(user), this.getHttpOptions())
    .pipe(tap(() => {
      this.getUsers();
    }));
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlBase}/${user.id}`, JSON.stringify(user), this.getHttpOptions())
    .pipe(tap(() => {
      this.getUsers();
    }));
  }

  public delete(user: User): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, this.getHttpOptions());
  }

  public selectUser(user: User) {
    this.selectUserEvent.emit(user);
  }
}
