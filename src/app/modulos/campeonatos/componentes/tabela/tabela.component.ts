import { Component } from '@angular/core';
import { Campeonato } from '../../models/campeonato';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent {

  public campeonatos: Campeonato[] = [];

  public delete(campeonato: Campeonato){

  }

  public getCampeonatoSelect(campeonato: Campeonato){

  }
}
