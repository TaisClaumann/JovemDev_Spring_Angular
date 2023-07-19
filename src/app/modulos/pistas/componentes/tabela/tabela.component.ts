import { Component, OnInit } from '@angular/core';
import { Pista } from '../../models/pista';
import { PistaService } from '../../services/pista.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public pistas: Pista[] = [];

  constructor(private service: PistaService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.pistas = data;
    });
    this.service.pistaSubject.subscribe((data) => {
      this.getPaisFiltrado(data);
    });
  }

  public getPaisFiltrado(pista: Pista){
    this.pistas = [];
    this.pistas.push(pista);
  }

  public delete(pista: Pista) {
    this.service.delete(pista).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pistas = data;
      })
    });
  }

  public getPistaSelect(pista: Pista){
    this.service.getPistaSelect(pista);
  }
}
