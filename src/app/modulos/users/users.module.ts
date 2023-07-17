import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './componentes/user/user.component';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserComponent,
    FormComponent,
    TabelaComponent
  ],
  exports:[
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UsersModule { }
