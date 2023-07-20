import { Component, OnInit } from '@angular/core';
import { Corrida } from 'src/app/modulos/corridas/models/corrida';
import { Pais } from 'src/app/modulos/paises/models/pais';
import { CorridasPorPaisAnoService } from '../../services/corridas-por-pais-ano.service';
import { PaisService } from 'src/app/modulos/paises/services/pais.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public paises: Pais[] = [];
  public paisId: number | null = null;
  public paisSelecionado = {} as Pais;
  public ano!: number;

  constructor(
    private service: CorridasPorPaisAnoService,
    private paisService: PaisService,
  ){}

  ngOnInit(): void {
    this.paisService.listAll().subscribe((data) => {
      this.paises = data;
    });
  }

  getCorridaByPaisAndAno(){
    this.service.findCorridaByPaisAndAno(this.ano, this.paisSelecionado.id);
  }

}
