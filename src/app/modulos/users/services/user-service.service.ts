import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  public emiteEmail = new EventEmitter();
  public emiteId = new EventEmitter();
  public selectUserEvent = new EventEmitter();
  private usersSubject = new Subject<User[]>();

  private urlBase: string = 'http://localhost:8099/user';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    this.http.get<User[]>(this.urlBase).subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/like/${name}`;
    this.http.get<User[]>(url).subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public getUserByEmail(email: string): Observable<User> {
    let url = `${this.urlBase}/email/${email}`;
    return this.http.get<User>(url);
  }

  public getUserById(id: number){
    let url = `${this.urlBase}/${id}`;
    return this.http.get<User>(url);
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

  public getEmail(email: string) {
    this.emiteEmail.emit(email);
  }

  public getId(id: number){
    this.emiteId.emit(id);
  }
}
