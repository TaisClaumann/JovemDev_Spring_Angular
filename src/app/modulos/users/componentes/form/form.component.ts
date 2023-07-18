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
  public id!: number;
  public users: User[] = [];

  constructor(private service: UserServiceService){}

  ngOnInit(): void {
    this.service.selectUserEvent.subscribe((data) => {
      this.user = data;
    })
  }

  public getUserById(){
    this.service.getId(this.id);
  }

  public insert(){
    if(this.user.id != null){
      this.service.update(this.user).subscribe((data) => {
        this.user = data;
      })
    } else {
      this.service.insert(this.user).subscribe((data) => {
        this.user = data;
      })
    }
  }

  public getUsersByName(){
    this.service.getUsersByName(this.user.name).subscribe((data) => {
      this.users = data;
    })
  }

  public getUserByEmail(){
    this.service.getEmail(this.user.email);
  }
}
