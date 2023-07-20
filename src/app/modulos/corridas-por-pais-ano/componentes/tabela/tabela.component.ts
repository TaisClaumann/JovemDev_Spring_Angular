import { Component, OnInit } from '@angular/core';
import { Corrida } from 'src/app/modulos/corridas/models/corrida';
import { CorridasPorPaisAnoService } from '../../services/corridas-por-pais-ano.service';
import { CorridasPaisAno } from '../../models/corridas-pais-ano';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public corridas: Corrida[] = [];
  public corridaPaisAno = {} as CorridasPaisAno;

  constructor(private service: CorridasPorPaisAnoService){}

  ngOnInit(): void {
    this.service.relatorioSubject.subscribe((data) => {
      this.corridaPaisAno = data;
      this.corridas = this.corridaPaisAno.corridas;
    })
  }
}
