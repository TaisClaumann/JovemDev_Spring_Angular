import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { CampeonatoComponent } from './componentes/campeonato/campeonato.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormComponent,
    TabelaComponent,
    CampeonatoComponent
  ],
  exports: [
    CampeonatoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CampeonatosModule { }
