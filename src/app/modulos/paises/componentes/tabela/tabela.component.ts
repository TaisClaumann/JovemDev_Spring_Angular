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
  }
}
