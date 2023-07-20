import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginService } from '../../login/services/login.service';
import { Observable, Subject, tap } from 'rxjs';
import { Piloto } from '../models/piloto';
import { Equipe } from '../../equipes/models/equipe';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {

  private urlBase: string = 'http://localhost:8099/piloto';
  public selectPilotoEvent = new EventEmitter();
  private pilotosSubject = new Subject<Piloto[]>();
  public pilotoSubject = new Subject<Piloto>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<Piloto[]>{
    this.http.get<Piloto[]>(this.urlBase, this.getHttpOptions()).subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  public findById(id: number): Observable<Piloto>{
    let url = `${this.urlBase}/${id}`;
    this.http.get<Piloto>(url, this.getHttpOptions()).subscribe((piloto) => this.pilotoSubject.next(piloto));
    return this.pilotoSubject.asObservable();
  }

  public findByNome(nome: string): Observable<Piloto[]>{
    let url = `${this.urlBase}/nome/${nome}`;
    this.http.get<Piloto[]>(url, this.getHttpOptions()).subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  public findByPais(paisId: number): Observable<Piloto[]>{
    let url = `${this.urlBase}/pais/${paisId}`;
    this.http.get<Piloto[]>(url, this.getHttpOptions()).subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  public findByEquipe(equipeId: number): Observable<Piloto[]>{
    let url = `${this.urlBase}/equipe/${equipeId}`;
    this.http.get<Piloto[]>(url, this.getHttpOptions()).subscribe((corridas) => this.pilotosSubject.next(corridas));
    return this.pilotosSubject.asObservable();
  }

  public insert(piloto: Piloto): Observable<Piloto>{
    return this.http.post<Piloto>(this.urlBase, JSON.stringify(piloto), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(piloto: Piloto): Observable<Piloto>{
    return this.http.put<Piloto>(`${this.urlBase}/${piloto.id}`, JSON.stringify(piloto), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public delete(piloto: Piloto): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${piloto.id}`);
  }

  public getPilotoSelect(piloto: Piloto){
    this.selectPilotoEvent.emit(piloto); 
  }
}
