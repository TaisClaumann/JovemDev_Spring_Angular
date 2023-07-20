import { Component, OnInit } from '@angular/core';
import { Piloto } from '../../models/piloto';
import { Pais } from 'src/app/modulos/paises/models/pais';
import { Equipe } from 'src/app/modulos/equipes/models/equipe';
import { PilotoService } from '../../services/piloto.service';
import { PaisService } from 'src/app/modulos/paises/services/pais.service';
import { ServiceService } from 'src/app/modulos/equipes/services/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public piloto = {} as Piloto;
  public paisId: number | null = null;
  public paisSelecionado = {} as Pais;
  public equipeId: number | null = null;
  public equipeSelecionada = {} as Equipe;
  public id!: number;
  public paises: Pais[] = [];
  public equipes: Equipe[] = [];

  constructor(private service: PilotoService, private paisService: PaisService, private equipeService: ServiceService){}

  ngOnInit(): void {
    this.paisService.listAll().subscribe((data) => {
      this.paises = data;
    });
    this.equipeService.listAll().subscribe((data) => {
      this.equipes = data;
    });
  }

  public getPilotosById() {
    this.service.findById(this.id);
  }

  public insert(){
    if(this.equipeSelecionada && this.paisSelecionado){
        this.piloto.paisId = this.paisSelecionado.id;
        this.piloto.equipeId = this.equipeSelecionada.id;

      if(this.piloto.id != null){
        this.service.update(this.piloto).subscribe((data) => {
          this.piloto = data;
          this.piloto = {} as Piloto;
        })
      } else {
        this.service.insert(this.piloto).subscribe((data) => {
          this.piloto = data;
          this.piloto = {} as Piloto;
        })
      }
    }
  }

  public getPilotosByNome() {
    this.service.findByNome(this.piloto.nome);
  }

  public getPilotosByPais() {
    this.service.findByPais(this.paisSelecionado.id);
  }

  public getPilotosByEquipe() {
    this.service.findByEquipe(this.equipeSelecionada.id);
  }
}
