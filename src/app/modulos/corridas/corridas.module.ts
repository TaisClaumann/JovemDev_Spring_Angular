import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { CorridaComponent } from './componentes/corrida/corrida.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormComponent,
    TabelaComponent,
    CorridaComponent
  ],
  exports: [
    CorridaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class CorridasModule { }
