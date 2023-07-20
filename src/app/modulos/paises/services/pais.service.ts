import { EventEmitter, Injectable } from '@angular/core';
import { Pais } from '../models/pais';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlBase: string = 'http://localhost:8099/pais';
  public selectPaisEvent = new EventEmitter();
  private paisesSubject = new Subject<Pais[]>();
  public paisSubject = new Subject<Pais>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Pais[]>{
    this.http.get<Pais[]>(this.urlBase, this.getHttpOptions()).subscribe((paises) => this.paisesSubject.next(paises));
    return this.paisesSubject.asObservable();
  }

  public findByName(name: string): Observable<Pais[]>{
    let url = `${this.urlBase}/like/${name}`;
    this.http.get<Pais[]>(url, this.getHttpOptions()).subscribe((paises) => this.paisesSubject.next(paises));
    return this.paisesSubject.asObservable();
  }

  public findById(id: number): Observable<Pais>{
    let url = `${this.urlBase}/${id}`;
    this.http.get<Pais>(url, this.getHttpOptions()).subscribe((pais) => this.paisSubject.next(pais));
    return this.paisSubject.asObservable();
  }

  public insert(pais: Pais): Observable<Pais>{
    return this.http.post<Pais>(this.urlBase, JSON.stringify(pais), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(pais: Pais): Observable<Pais>{
    return this.http.put<Pais>(`${this.urlBase}/${pais.id}`, JSON.stringify(pais), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public delete(pais: Pais): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${pais.id}`, this.getHttpOptions());
  }

  public getPaisSelect(pais: Pais){
    this.selectPaisEvent.emit(pais); 
  }
}
