import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modulos/home/componentes/home-page/home-page.component';
import { UserComponent } from './modulos/users/componentes/user/user.component';
import { PaisComponent } from './modulos/paises/componentes/pais/pais.component';
import { EquipeComponent } from './modulos/equipes/componentes/equipe/equipe.component';
import { CampeonatoComponent } from './modulos/campeonatos/componentes/campeonato/campeonato.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "user", component: UserComponent},
  {path: "pais", component: PaisComponent},
  {path: "equipe", component: EquipeComponent},
  {path: "campeonato", component: CampeonatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
