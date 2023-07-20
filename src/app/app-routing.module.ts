import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonatoComponent } from './modulos/campeonatos/componentes/campeonato/campeonato.component';
import { RelatorioComponent as RelatorioCorrida } from './modulos/corridas-por-pais-ano/componentes/relatorio/relatorio.component';
import { CorridaComponent } from './modulos/corridas/componentes/corrida/corrida.component';
import { EquipeComponent } from './modulos/equipes/componentes/equipe/equipe.component';
import { HomePageComponent } from './modulos/home/componentes/home-page/home-page.component';
import { LoginComponent } from './modulos/login/componentes/login/login.component';
import { PaisComponent } from './modulos/paises/componentes/pais/pais.component';
import { PilotoCorridaComponent } from './modulos/pilotos-corridas/componentes/piloto-corrida/piloto-corrida.component';
import { RelatorioComponent as RelatorioPilotos } from './modulos/pilotos-por-pais-corrida/componentes/relatorio/relatorio.component';
import { PilotoComponent } from './modulos/pilotos/componentes/piloto/piloto.component';
import { PistaComponent } from './modulos/pistas/componentes/pista/pista.component';
import { UserComponent } from './modulos/users/componentes/user/user.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "auth", component: LoginComponent},
  {path: "user", component: UserComponent},
  {path: "pais", component: PaisComponent},
  {path: "equipe", component: EquipeComponent},
  {path: "campeonato", component: CampeonatoComponent},
  {path: "pista", component: PistaComponent},
  {path: "corrida", component: CorridaComponent},
  {path: "piloto", component: PilotoComponent},
  {path: "piloto-corrida", component: PilotoCorridaComponent},
  {path: "corridas-pais-ano", component: RelatorioCorrida},
  {path: "pilotos-pais-corrida", component: RelatorioPilotos}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
