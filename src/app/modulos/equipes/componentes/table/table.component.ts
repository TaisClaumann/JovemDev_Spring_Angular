import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../models/equipe';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  public equipes: Equipe[] = [];

  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.equipes = data;
    });
    this.service.equipeSubject.subscribe((data) => {
      this.getEquipeFiltrada(data);
    })
  }

  public getEquipeFiltrada(equipe: Equipe){
    this.equipes = [];
    this.equipes.push(equipe);
  }

  public delete(equipe: Equipe){
    this.service.delete(equipe).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.equipes = data;
      })
    });
  }

  public getEquipeSelect(equipe: Equipe){
    this.service.getEquipeSelect(equipe);
  }
}
