import { EventEmitter, Injectable } from '@angular/core';
import { Pais } from '../models/pais';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlBase: string = 'http://localhost:8099/pais';
  public selectPaisEvent = new EventEmitter();
  private paisesSubject = new Subject<Pais[]>();

  constructor(private http: HttpClient) {}

  public listAll(): Observable<Pais[]>{
    this.http.get<Pais[]>(this.urlBase).subscribe((paises) => this.paisesSubject.next(paises));
    return this.paisesSubject.asObservable();
  }

  
}
