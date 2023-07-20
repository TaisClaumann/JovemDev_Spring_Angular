import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { PilotoComponent } from './componentes/piloto/piloto.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    PilotoComponent,
    TabelaComponent
  ],
  exports: [
    PilotoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PilotosModule { }
