import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public pais = {} as Pais;
  public id !: number;

  constructor(private service: PaisService){}

  ngOnInit(): void {
    this.service.selectPaisEvent.subscribe((data) => {
      this.pais = data;
    })
  }

  public insert(){
    if(this.pais.id != null){
      this.service.update(this.pais).subscribe((data) => {
        this.pais = data;
        this.pais = {} as Pais;
      });
    } else {
      this.service.insert(this.pais).subscribe((data) => {
        this.pais = data;
        this.pais = {} as Pais;
      });
    }
  }

  public limpa(){
    this.pais = {id: 0, name: ""};
  }
  public getPaisById(){
    this.service.findById(this.id);
  }

  public getPaisByName(){
    this.service.findByName(this.pais.name);
  }
}
