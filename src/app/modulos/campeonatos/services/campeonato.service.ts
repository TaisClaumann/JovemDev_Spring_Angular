import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Campeonato } from '../models/campeonato';
import { Observable, Subject, tap } from 'rxjs';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private urlBase: string = 'http://localhost:8099/campeonato';
  public selectCampeonatoEvent = new EventEmitter();
  private campeonatosSubject = new Subject<Campeonato[]>();
  public campeonatoSubject = new Subject<Campeonato>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Campeonato[]>{
    this.http.get<Campeonato[]>(this.urlBase, this.getHttpOptions()).subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  public findByDescription(description: string): Observable<Campeonato[]>{
    let url = `${this.urlBase}/like/${description}`;
    this.http.get<Campeonato[]>(url, this.getHttpOptions()).subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  public findByDescriptionAndAno(description: string, ano: number): Observable<Campeonato[]>{
    let url = `${this.urlBase}/description-ano/${description}/${ano}`;
    this.http.get<Campeonato[]>(url, this.getHttpOptions()).subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  public findById(id: number): Observable<Campeonato>{
    let url = `${this.urlBase}/${id}`;
    this.http.get<Campeonato>(url, this.getHttpOptions()).subscribe((campeonato) => this.campeonatoSubject.next(campeonato));
    return this.campeonatoSubject.asObservable();
  }

  public findByAno(ano: number): Observable<Campeonato[]>{
    let url = `${this.urlBase}/ano/${ano}`;
    this.http.get<Campeonato[]>(url, this.getHttpOptions()).subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  public findByAnoBetween(anoInicial: number, anoFinal: number): Observable<Campeonato[]>{
    let url = `${this.urlBase}/between/${anoInicial}/${anoFinal}`;
    this.http.get<Campeonato[]>(url, this.getHttpOptions()).subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  public insert(campeonato: Campeonato): Observable<Campeonato>{
    return this.http.post<Campeonato>(this.urlBase, JSON.stringify(campeonato), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(campeonato: Campeonato): Observable<Campeonato>{
    return this.http.put<Campeonato>(`${this.urlBase}/${campeonato.id}`, JSON.stringify(campeonato), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public delete(campeonato: Campeonato): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${campeonato.id}`, this.getHttpOptions());
  }

  public getPaisSelect(campeonato: Campeonato){
    this.selectCampeonatoEvent.emit(campeonato); 
  }
}
