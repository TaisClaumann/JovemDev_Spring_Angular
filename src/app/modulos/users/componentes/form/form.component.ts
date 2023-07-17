import { Component, EventEmitter } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  public nome: string = "";
  public email: string = "";
  public senha: string = "";
  public permissoes: string = "";

  constructor(private service: UserServiceService){}

  public getUsersByName(){
    this.service.getNome(this.nome);
  }

  public getUserByEmail(){
    this.service.getEmail(this.email);
  }
}
