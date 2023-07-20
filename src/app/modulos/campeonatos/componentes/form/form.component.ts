import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public campeonato = {} as Campeonato;
  public id !: number;
  public anoInicial!: number;
  public anoFinal!: number;
  public description!: string;
  public ano!: number;

  constructor(private service: CampeonatoService){}

  ngOnInit(): void {
    this.service.selectCampeonatoEvent.subscribe((data) => {
      this.campeonato = data;
    })
  }

  public insert(){
    if(this.campeonato.id != null){
      this.service.update(this.campeonato).subscribe((data) => {
        this.campeonato = data;
        this.campeonato = {} as Campeonato;
      })
    } else {
      this.service.insert(this.campeonato).subscribe((data) => {
        this.campeonato = data;
        this.campeonato = {} as Campeonato;
      })
    }
  }

  public getCampeoantoByDescription() {
    this.service.findByDescription(this.campeonato.description);
  }

  public getCampeonatoByAno() {
    this.service.findByAno(this.campeonato.ano);
  }

  public getCampeonatoById() {
    this.service.findById(this.id);
  }

  public getCampeonatoByAnoBetween(){
    this.service.findByAnoBetween(this.anoInicial, this.anoFinal);
  }

  public getCampeonatoByDescriptionEAno() {
    this.service.findByDescriptionAndAno(this.description, this.ano);
  }
}
