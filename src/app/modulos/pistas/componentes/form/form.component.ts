import { Component, OnInit } from '@angular/core';
import { Pista } from '../../models/pista';
import { Pais } from 'src/app/modulos/paises/models/pais';
import { PaisService } from 'src/app/modulos/paises/services/pais.service';
import { PistaService } from '../../services/pista.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public pista = {} as Pista;
  public paises: Pais[] = [];
  public id!: number;
  public tamanhoInicial!: number;
  public tamanhoFinal!: number;
  public paisSelecionado = {} as Pais;
  public paisId: number | null = null;

  constructor(private paisService: PaisService, private service: PistaService){}

  ngOnInit(): void {
    this.paisService.listAll().subscribe((data) => {
      this.paises = data;
    });
    this.service.selectPistaEvent.subscribe((data) => {
      this.pista = data;
    })
  }

  onChangePais() {
    this.getPistaByPais();
  }

  public insert() {
    if(this.paisSelecionado){
      this.pista.pais = this.paisSelecionado;
      if(this.pista.id != null){
        this.service.update(this.pista).subscribe((data) => {
          this.pista = data;
          this.pista = {} as Pista;
        })
      } else {
        this.service.insert(this.pista).subscribe((data) => {
          this.pista = data;
          this.pista = {} as Pista;
        });
      }
    }
  }

  public getPistaByTamanho() {
    this.service.findByTamanho(this.tamanhoInicial, this.tamanhoFinal);
  }

  public getPistaById() {
    this.service.findById(this.id);
  }

  public getPistaByPais() {
    if (this.paisId !== null) {
      this.service.findByPais(this.paisId);
    }
  }
}
