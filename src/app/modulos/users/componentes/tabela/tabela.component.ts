import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public users : User[] = [];  
  constructor(private service: UserServiceService){}

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    });
    this.service.emiteNome.subscribe((nome) => {
      this.service.getUsersByName(nome).subscribe((data) => {
        this.users = data;
      });
    });
    this.service.emiteEmail.subscribe((email) => {
      this.service.getUsersByEmail(email).subscribe((data) => {
        this.users = [];
        this.users.push(data);
      });
    });
  }
}
