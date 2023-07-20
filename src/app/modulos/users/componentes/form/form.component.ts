import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  public user = {} as User;
  public userFound = {} as User;
  public id!: number;

  constructor(private service: UserServiceService){}

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((data) => {
      this.user = data;
    })
  }

  public insert(){
    if(this.user.id != null){
      this.service.update(this.user).subscribe((data) => {
        this.user = data;
        this.user = {} as User;
      });
    } else {
      this.service.insert(this.user).subscribe((data) => {
        this.user = data;
        this.user = {} as User;
      });
    }
  }

  public getUsersByName(){
    this.service.getUsersByName(this.user.name);
  }

  public getUserByEmail(){
    this.service.getUserByEmail(this.user.email);
  }

  public getUserById(){
    this.service.getUserById(this.id);
  }
}
