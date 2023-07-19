import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { PistaComponent } from './componentes/pista/pista.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    TabelaComponent,
    PistaComponent
  ],
  exports: [
    PistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PistasModule { }
