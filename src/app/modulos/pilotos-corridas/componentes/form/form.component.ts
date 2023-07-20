import { Component, OnInit } from '@angular/core';
import { Corrida } from 'src/app/modulos/corridas/models/corrida';
import { Piloto } from 'src/app/modulos/pilotos/models/piloto';
import { PilotoCorrida } from '../../models/piloto-corrida';
import { PilotoCorridaService } from '../../services/piloto-corrida.service';
import { PilotoService } from 'src/app/modulos/pilotos/services/piloto.service';
import { CorridaService } from 'src/app/modulos/corridas/services/corrida.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public id!: number;
  public pilotoId: number | null = null;
  public pilotoSelecionado = {} as Piloto;
  public pilotos: Piloto[] = [];
  public corridaId: number | null = null;
  public corridaSelecionada = {} as Corrida;
  public corridas: Corrida[] = [];
  public pilotoCorrida = {} as PilotoCorrida;

  constructor(
    private service: PilotoCorridaService,
    private pilotoService: PilotoService,
    private corridaService: CorridaService
  ){}

  ngOnInit(): void {
    this.service.selectPilotoCorridaEvent.subscribe((data) => {
      this.pilotoCorrida = data;
    });
    this.pilotoService.listAll().subscribe((data) => {
      this.pilotos = data;
    });
    this.corridaService.listAll().subscribe((data) => {
      this.corridas = data;
    });
  }

  public insert(){
    this.pilotoCorrida.corridaId = this.corridaSelecionada.id;
    this.pilotoCorrida.pilotoId = this.pilotoSelecionado.id;

    if(this.pilotoCorrida.id != null){
      this.service.update(this.pilotoCorrida).subscribe((data) => {
        this.pilotoCorrida = data;
        this.pilotoCorrida = {} as PilotoCorrida;
      });
    } else {
      this.service.insert(this.pilotoCorrida).subscribe((data) => {
        this.pilotoCorrida = data;
        this.pilotoCorrida = {} as PilotoCorrida;
      })
    }
  }

  public getByCorridaOrderByColocacao(){
    this.service.findByCorridaOrderByColocacao(this.corridaSelecionada.id);
  }

  public getPilotoCorridaById() {
    this.service.findById(this.id);
  }

  public getPilotoCorridaByPiloto() {
    this.service.findByPiloto(this.pilotoSelecionado.id);
  }

  public getPilotoCorridaByCorrida() {
    this.service.findByCorrida(this.corridaSelecionada.id);
  }
}
