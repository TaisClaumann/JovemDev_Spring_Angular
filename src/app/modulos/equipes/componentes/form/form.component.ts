import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../models/equipe';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public equipe = {} as Equipe;
  public id !: number;

  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.service.selectEquipeEvent.subscribe((data) => {
      this.equipe = data;
    })
  }

  public insert(){
    if(this.equipe.id != null){
      this.service.update(this.equipe).subscribe((data) => {
        this.equipe = data;
        this.equipe = {} as Equipe;
      });
    } else {
      this.service.insert(this.equipe).subscribe((data) => {
        this.equipe = data;
        this.equipe = {} as Equipe;
      })
    }
  }

  public getEquipeByName(){
    this.service.findByName(this.equipe.name);
  }

  public getEquipeById(){
    this.service.findById(this.id);
  }
}
