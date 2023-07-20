import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { Pista } from 'src/app/modulos/pistas/models/pista';
import { PistaService } from 'src/app/modulos/pistas/services/pista.service';
import { Campeonato } from 'src/app/modulos/campeonatos/models/campeonato';
import { CampeonatoService } from 'src/app/modulos/campeonatos/services/campeonato.service';
import { CorridaService } from '../../services/corrida.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public corrida = {} as Corrida;
  public pistaSelecionada = {} as Pista;
  public pistaId: number | null = null;
  public pistas: Pista[] = [];
  public campeonatoSelecionado = {} as Campeonato;
  public campeonatoId: number | null = null;
  public campeonatos: Campeonato[] = [];
  public id!: number;
  public dataInicial!: string;
  public dataFinal!: string;

  constructor(
    private pistaService: PistaService,
    private campeonatoService: CampeonatoService,
    private service: CorridaService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.pistaService.listAll().subscribe((data) => {
      this.pistas = data;
    });
    this.campeonatoService.listAll().subscribe((data) => {
      this.campeonatos = data;
    })
    this.service.selectCorridaEvent.subscribe((data) => {
      this.corrida = data;
    })
  }

  public insert() {
    if (this.pistaId && this.campeonatoId) {
      this.corrida.pistaId = this.pistaId;
      this.corrida.campeonatoId = this.campeonatoId;
    }
    
    const dataFormatada = this.formataData(this.corrida.data);
    if (dataFormatada) {
      this.corrida.data = dataFormatada;
    }

    if (this.corrida.id != null) {
      this.service.update(this.corrida).subscribe((data) => {
        this.corrida = data;
        this.corrida = {} as Corrida;
      });
    } else {
      this.service.insert(this.corrida).subscribe((data) => {
        this.corrida = data;
        this.corrida = {} as Corrida;
      });
    }
  }

  public getCorridaById() {
    this.service.findById(this.id);
  }

  public getCorridaByDataBetween() {
    const dataInicial = this.formataData(this.dataInicial);
    const dataFinal = this.formataData(this.dataFinal);
    if (dataInicial && dataFinal) {
      this.service.findByDataBetween(dataInicial, dataFinal);
    }
  }

  private formataData(data: string) {
    return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm');
  }

  public getCorridaByData() {
    const data = this.formataData(this.corrida.data);
    if (data) {
      this.service.findByData(data);
    }
  }

  public getCorridaByPista() {
    if (this.pistaId != null) {
      this.service.findByPista(this.pistaId);
    }
  }

  public getCorridaByCampeonato() {
    if (this.campeonatoId != null) {
      this.service.findByCampeonato(this.campeonatoId);
    }
  }
}
