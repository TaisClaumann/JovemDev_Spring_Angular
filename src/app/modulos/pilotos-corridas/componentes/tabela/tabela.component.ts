import { Component, OnInit } from '@angular/core';
import { PilotoCorrida } from '../../models/piloto-corrida';
import { PilotoCorridaService } from '../../services/piloto-corrida.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public pilotosCorridas: PilotoCorrida[] = [];

  constructor(private service: PilotoCorridaService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.pilotosCorridas = data;
    });
    this.service.pilotoCorridaSubject.subscribe((data) => {
      this.getPilotoCorridaFiltrado(data);
    });
  }

  public getPilotoCorridaFiltrado(pilotoCorrida: PilotoCorrida){
    this.pilotosCorridas = [];
    this.pilotosCorridas.push(pilotoCorrida);
  }

  public delete(pilotoCorrida: PilotoCorrida){
    this.service.delete(pilotoCorrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pilotosCorridas = data;
      })
    });
  }

  public getPilotoCorridaSelect(pilotoCorrida: PilotoCorrida) {
    this.service.getPilotoSelect(pilotoCorrida);
  }
}
