import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Equipe } from '../models/equipe';
import { Observable, Subject, tap } from 'rxjs';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlBase: string = 'http://localhost:8099/equipe';
  public selectEquipeEvent = new EventEmitter();
  private equipesSubject = new Subject<Equipe[]>();
  public equipeSubject = new Subject<Equipe>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Equipe[]>{
    this.http.get<Equipe[]>(this.urlBase, this.getHttpOptions()).subscribe((paises) => this.equipesSubject.next(paises));
    return this.equipesSubject.asObservable();
  }

  public findByName(name: string): Observable<Equipe[]>{
    let url = `${this.urlBase}/like/${name}`;
    this.http.get<Equipe[]>(url, this.getHttpOptions()).subscribe((paises) => this.equipesSubject.next(paises));
    return this.equipesSubject.asObservable();
  }

  public findById(id: number): Observable<Equipe>{
    let url = `${this.urlBase}/${id}`;
    this.http.get<Equipe>(url, this.getHttpOptions()).subscribe((pais) => this.equipeSubject.next(pais));
    return this.equipeSubject.asObservable();
  }

  public insert(equipe: Equipe): Observable<Equipe>{
    return this.http.post<Equipe>(this.urlBase, JSON.stringify(equipe), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(equipe: Equipe): Observable<Equipe>{
    return this.http.put<Equipe>(`${this.urlBase}/${equipe.id}`, JSON.stringify(equipe), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public delete(equipe: Equipe): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${equipe.id}`, this.getHttpOptions());
  }

  public getEquipeSelect(equipe: Equipe){
    this.selectEquipeEvent.emit(equipe); 
  }
}
