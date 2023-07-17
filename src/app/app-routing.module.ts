import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modulos/home/componentes/home-page/home-page.component';
import { UserComponent } from './modulos/users/componentes/user/user.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "user", component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
