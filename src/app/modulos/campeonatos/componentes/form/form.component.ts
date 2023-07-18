import { Component } from '@angular/core';
import { Campeonato } from '../../models/campeonato';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  public campeonato = {} as Campeonato;
  public id !: number;
  public anoInicial!: number;
  public anoFinal!: number;

  public insert(){

  }

  public getCampeoantoByDescription() {

  }

  public getCampeonatoByAno() {

  }

  public getCampeonatoById() {

  }

  public getCampeonatoByAnoBetween(){

  }

}
