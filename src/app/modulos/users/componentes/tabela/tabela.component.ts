import { Component, Input, OnInit } from '@angular/core';
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
    this.service.userSubject.subscribe((data) => {
      this.getUserFiltrado(data);
    });
  }

  public getUserFiltrado(data: any){
    this.users = [];
    this.users.push(data);
  }

  public selectUser(user:User){
    this.service.selectUser(user);
  }

  public delete(user:User){
    this.service.delete(user).subscribe(() => {
      this.service.getUsers().subscribe((data) => {
        this.users = data;
      })
    });
  }
}
