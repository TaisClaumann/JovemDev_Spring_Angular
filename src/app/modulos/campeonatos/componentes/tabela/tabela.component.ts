import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public campeonatos: Campeonato[] = [];

  constructor(private service: CampeonatoService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.campeonatos = data;
    });
    this.service.campeonatoSubject.subscribe((data) => {
      this.getCampeonatoFiltrado(data);
    })
  }

  public getCampeonatoFiltrado(campeonato: Campeonato){
    this.campeonatos = [];
    this.campeonatos.push(campeonato);
  }

  public delete(campeonato: Campeonato){
    this.service.delete(campeonato).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.campeonatos = data;
      })
    });
  }

  public getCampeonatoSelect(campeonato: Campeonato){
    this.service.getPaisSelect(campeonato);
  }
}
