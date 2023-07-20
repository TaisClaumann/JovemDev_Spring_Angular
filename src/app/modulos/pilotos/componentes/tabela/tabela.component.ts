import { Component, OnInit } from '@angular/core';
import { Piloto } from '../../models/piloto';
import { PilotoService } from '../../services/piloto.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public pilotos: Piloto[] = [];

  constructor(private service: PilotoService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.pilotos = data;
    });
    this.service.pilotoSubject.subscribe((data) => {
      this.getPilotoFiltado(data);
    });
  }

  public getPilotoFiltado(piloto: Piloto){
    this.pilotos = [];
    this.pilotos.push(piloto);
  }

  public delete(piloto: Piloto){
    this.service.delete(piloto).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.pilotos = data;
      })
    });
  }

  public getPilotoSelect(piloto: Piloto){
    this.service.getPilotoSelect(piloto);
  }
}
