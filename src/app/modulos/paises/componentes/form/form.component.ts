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

  constructor(private service: PaisService){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
