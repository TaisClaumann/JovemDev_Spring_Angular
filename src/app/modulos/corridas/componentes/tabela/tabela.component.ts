import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../services/corrida.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public corridas: Corrida[] = [];

  constructor(private service: CorridaService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.corridas = data;
    });
    this.service.corridaSubject.subscribe((data) => {
      this.getCorridaFiltrada(data);
    })
  }

  public getCorridaFiltrada(corrida: Corrida){
    this.corridas = [];
    this.corridas.push(corrida);
  }

  public delete(corrida: Corrida) {
    this.service.delete(corrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.corridas = data;
      })
    });
  }

  public getCorridaSelect(corrida: Corrida) {
    this.service.getCorridaSelect(corrida);
  }
}
