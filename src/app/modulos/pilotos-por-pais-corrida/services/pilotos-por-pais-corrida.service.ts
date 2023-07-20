import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login/services/login.service';
import { Observable, Subject } from 'rxjs';
import { PilotosPorPaisCorrida } from '../models/pilotos-por-pais-corrida';
import { TotalPilotos } from '../models/total-pilotos';

@Injectable({
  providedIn: 'root'
})
export class PilotosPorPaisCorridaService {

  private urlBase: string = 'http://localhost:8099/relatorios';
  public relatorioSubject = new Subject<PilotosPorPaisCorrida>();
  public totalPilotosSubject = new Subject<TotalPilotos>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public findPilotoByPaisAndCorrida(corridaId: number, paisId: number): Observable<PilotosPorPaisCorrida>{
    let url = `${this.urlBase}/pilotos_by_pais_by_corrida/${corridaId}/${paisId}`;
    this.http.get<PilotosPorPaisCorrida>(url, this.getHttpOptions()).subscribe((data) => {
      this.relatorioSubject.next(data)
    });
    return this.relatorioSubject.asObservable();
  }

  public findTotalPilotos(corridaId: number, paisId: number): Observable<TotalPilotos>{
    let url = `${this.urlBase}/total_pilotos_pais_by_corrida/${corridaId}/${paisId}`;
    this.http.get<TotalPilotos>(url, this.getHttpOptions()).subscribe((data) => {
      this.totalPilotosSubject.next(data)
    });
    return this.totalPilotosSubject.asObservable();
  }
}
