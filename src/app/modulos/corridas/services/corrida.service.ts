import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Corrida } from '../models/corrida';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {

  private urlBase: string = 'http://localhost:8099/corrida';
  public selectCorridaEvent = new EventEmitter();
  private corridasSubject = new Subject<Corrida[]>();
  public corridaSubject = new Subject<Corrida>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Corrida[]>{
    this.http.get<Corrida[]>(this.urlBase).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findById(id: number): Observable<Corrida>{
    let url = `${this.urlBase}/${id}`;
    this.http.get<Corrida>(url).subscribe((corrida) => this.corridaSubject.next(corrida));
    return this.corridaSubject.asObservable();
  }

  public findByData(data: string): Observable<Corrida[]>{
    let url = `${this.urlBase}/data?data=${data}`;
    this.http.get<Corrida[]>(url).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findByDataBetween(dataInicial: string, dataFinal: string): Observable<Corrida[]>{
    let url = `${this.urlBase}/between?dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
    this.http.get<Corrida[]>(url).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findByPista(pistaId: number): Observable<Corrida[]>{
    let url = `${this.urlBase}/pista/${pistaId}`;
    this.http.get<Corrida[]>(url).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public findByCampeonato(campeonatoId: number): Observable<Corrida[]>{
    let url = `${this.urlBase}/campeonato/${campeonatoId}`;
    this.http.get<Corrida[]>(url).subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  public insert(corrida: Corrida): Observable<Corrida>{
    return this.http.post<Corrida>(this.urlBase, JSON.stringify(corrida), this.httpOptions)
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(corrida: Corrida): Observable<Corrida>{
    return this.http.put<Corrida>(`${this.urlBase}/${corrida.id}`, JSON.stringify(corrida), this.httpOptions)
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public delete(corrida: Corrida): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${corrida.id}`);
  }

  public getCorridaSelect(corrida: Corrida){
    this.selectCorridaEvent.emit(corrida); 
  }
}
