import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public paises: Pais[] = [];

  constructor(private service: PaisService){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.paises = data;
    })
    this.service.paisSubject.subscribe((data) => {
      this.getPaisFiltrado(data);
    })
  }

  public getPaisFiltrado(pais: Pais){
    this.paises = [];
    this.paises.push(pais);
  }

  public getPaisSelect(pais: Pais){
    this.service.getPaisSelect(pais);
  }

  public delete(pais:Pais){
    this.service.delete(pais).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.paises = data;
      })
    });
  }
}
