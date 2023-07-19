import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Pista } from '../models/pista';
import { Pais } from '../../paises/models/pais';

@Injectable({
  providedIn: 'root'
})
export class PistaService {

  private urlBase: string = 'http://localhost:8099/pista';
  public selectPistaEvent = new EventEmitter();
  private pistasSubject = new Subject<Pista[]>();
  public pistaSubject = new Subject<Pista>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Pista[]>{
    this.http.get<Pista[]>(this.urlBase).subscribe((pistas) => this.pistasSubject.next(pistas));
    return this.pistasSubject.asObservable();
  }

  public findByTamanho(tamanhoInicial: number, tamanhoFinal: number): Observable<Pista[]>{
    let url = `${this.urlBase}/between/${tamanhoInicial}/${tamanhoFinal}`;
    this.http.get<Pista[]>(url).subscribe((pistas) => this.pistasSubject.next(pistas));
    return this.pistasSubject.asObservable();
  }

  public findById(id: number): Observable<Pista>{
    let url = `${this.urlBase}/${id}`;
    this.http.get<Pista>(url).subscribe((pista) => this.pistaSubject.next(pista));
    return this.pistaSubject.asObservable();
  }

  public findByPais(paisId: Number): Observable<Pista[]> {
    let url = `${this.urlBase}/pais/${paisId}`;
    this.http.get<Pista[]>(url).subscribe((pistas) => this.pistasSubject.next(pistas));
    return this.pistasSubject.asObservable();
  }

  public insert(pista: Pista): Observable<Pista>{
    return this.http.post<Pista>(this.urlBase, pista, this.httpOptions)
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(pista: Pista): Observable<Pista>{
    return this.http.put<Pista>(`${this.urlBase}/${pista.id}`, JSON.stringify(pista), this.httpOptions)
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public delete(pista: Pista): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${pista.id}`);
  }

  public getPistaSelect(pista: Pista){
    this.selectPistaEvent.emit(pista); 
  }
}
