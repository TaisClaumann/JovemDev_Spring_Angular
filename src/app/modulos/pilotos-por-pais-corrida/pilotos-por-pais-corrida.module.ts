import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioComponent } from './componentes/relatorio/relatorio.component';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RelatorioComponent,
    FormComponent,
    TabelaComponent
  ],
  exports: [
    RelatorioComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PilotosPorPaisCorridaModule { }
