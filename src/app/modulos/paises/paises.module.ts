import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { PaisComponent } from './componentes/pais/pais.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    TabelaComponent,
    PaisComponent
  ],
  exports: [
    PaisComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PaisesModule { }
