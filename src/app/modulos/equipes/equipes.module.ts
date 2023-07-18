import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { TableComponent } from './componentes/table/table.component';
import { EquipeComponent } from './componentes/equipe/equipe.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    TableComponent,
    EquipeComponent
  ],
  exports: [
    EquipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EquipesModule { }
