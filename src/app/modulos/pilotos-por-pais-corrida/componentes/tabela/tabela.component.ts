import { Component, OnInit } from '@angular/core';
import { PilotosPais } from '../../models/pilotos-pais';
import { PilotosPorPaisCorridaService } from '../../services/pilotos-por-pais-corrida.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public pilotosPais: PilotosPais[] = [];

  constructor(private service: PilotosPorPaisCorridaService){}

  ngOnInit(): void {
    this.service.relatorioSubject.subscribe((data) => {
      this.pilotosPais = data.pilotosPais;
    });
  }
}
