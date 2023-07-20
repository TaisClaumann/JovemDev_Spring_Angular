import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { PilotoCorridaComponent } from './componentes/piloto-corrida/piloto-corrida.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    TabelaComponent,
    PilotoCorridaComponent
  ],
  exports: [
    PilotoCorridaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PilotosCorridasModule { }
