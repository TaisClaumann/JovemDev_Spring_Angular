import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginService } from '../../login/services/login.service';
import { CorridasPaisAno } from '../models/corridas-pais-ano';

@Injectable({
  providedIn: 'root'
})
export class CorridasPorPaisAnoService {

  private urlBase: string = 'http://localhost:8099/relatorios';
  public relatorioSubject = new Subject<CorridasPaisAno>();

  constructor(private http: HttpClient, private loginService: LoginService) {}

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public findCorridaByPaisAndAno(anoCorrida: number, paisId: number): Observable<CorridasPaisAno>{
    let url = `${this.urlBase}/corridas_by_ano_pais/${anoCorrida}/${paisId}`;
    this.http.get<CorridasPaisAno>(url, this.getHttpOptions()).subscribe((data) => {
      this.relatorioSubject.next(data)
    });
    return this.relatorioSubject.asObservable();
  }
}
