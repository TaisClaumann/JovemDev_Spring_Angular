import { Component, OnInit } from '@angular/core';
import { Corrida } from 'src/app/modulos/corridas/models/corrida';
import { Pais } from 'src/app/modulos/paises/models/pais';
import { PilotosPorPaisCorridaService } from '../../services/pilotos-por-pais-corrida.service';
import { PaisService } from 'src/app/modulos/paises/services/pais.service';
import { CorridaService } from 'src/app/modulos/corridas/services/corrida.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public paises: Pais[] = [];
  public paisId: number | null = null;
  public paisSelecionado = {} as Pais;
  public corridas: Corrida[] = [];
  public corridaId: number | null = null;
  public corridaSelecionada = {} as Corrida;
  public totalPilotos!: number;

  constructor(
    private service: PilotosPorPaisCorridaService,
    private paisService: PaisService,
    private corridaService: CorridaService
  ){}

  ngOnInit(): void {
    this.paisService.listAll().subscribe((data) => {
      this.paises = data;
    });
    this.corridaService.listAll().subscribe((data) => {
      this.corridas = data;
    });
  }

  public getPilotoByPaisAndCorrida() {
    this.service.findPilotoByPaisAndCorrida(this.corridaSelecionada.id, this.paisSelecionado.id);
    this.service.findTotalPilotos(this.corridaSelecionada.id, this.paisSelecionado.id).subscribe((data) => {
      this.totalPilotos = data.totalPilotos;
    });
  }
}
