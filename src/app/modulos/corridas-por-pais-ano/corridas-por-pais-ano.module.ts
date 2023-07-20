import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './componentes/form/form.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { RelatorioComponent } from './componentes/relatorio/relatorio.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    TabelaComponent,
    RelatorioComponent
  ],
  exports: [
    RelatorioComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CorridasPorPaisAnoModule { }
