import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  @Input() public email!: string;
  @Input() public name!: string;
  
  public users : User[] = [];  
  constructor(private service: UserServiceService){}


  ngOnInit(): void {
    this.getUsers();
    this.getUsersByName();
    this.getUserByEmail();
  }

  private getUsers(){
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  private getUsersByName(){
    this.service.emiteNome.subscribe((nome) => {
      this.service.getUsersByName(nome).subscribe((data) => {
        this.users = data;
      });
    });
  }

  private getUserByEmail(){
    this.service.emiteEmail.subscribe((email) => {
      this.service.getUserByEmail(email).subscribe((data) => {
        this.users = [];
        this.users.push(data);
      });
    });
  }
}
