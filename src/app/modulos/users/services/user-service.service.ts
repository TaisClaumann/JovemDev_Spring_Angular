import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { User } from '../models/user';
import { Token } from '@angular/compiler';
import { GlobalService } from 'src/app/services/global.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  public selectUserEvent = new EventEmitter();
  private usersSubject = new Subject<User[]>();
  public userSubject = new Subject<User>();

  private urlBase: string = 'http://localhost:8099/user';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  private httpOptions2 = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    responseType: 'text' as 'json'
  }

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  private getToken() {
    this.globalService.getToken("will@gmail.com", "123");
    console.log(this.globalService.token);
  }

  public getUsers(): Observable<User[]> {
    this.getToken();
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.globalService.token}),
    };
    this.http.get<User[]>(this.urlBase, httpOptions).subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/like/${name}`;
    this.http.get<User[]>(url).subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUserByEmail(email: string): Observable<User> {
    let url = `${this.urlBase}/email/${email}`;
    this.http.get<User>(url).subscribe((user) => this.userSubject.next(user));
    return this.userSubject.asObservable();
  }

  public getUserById(id: number){
    let url = `${this.urlBase}/${id}`;
    this.http.get<User>(url).subscribe((user) => this.userSubject.next(user));
    return this.userSubject.asObservable();
  }

  public insert(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, JSON.stringify(user), this.httpOptions)
    .pipe(tap(() => {
      this.getUsers();
    }));
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(`${this.urlBase}/${user.id}`, JSON.stringify(user), this.httpOptions)
    .pipe(tap(() => {
      this.getUsers();
    }));
  }

  public delete(user: User): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${user.id}`);
  }

  public selectUser(user: User) {
    this.selectUserEvent.emit(user);
  }
}
