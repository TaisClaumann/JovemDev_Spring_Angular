import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modulos/home/home.module';
import { MenusModule } from './modulos/menus/menus.module';
import { UsersModule } from './modulos/users/users.module';
import {HttpClientModule} from '@angular/common/http'
import { PaisesModule } from './modulos/paises/paises.module';
import { EquipesModule } from './modulos/equipes/equipes.module';
import { CampeonatosModule } from './modulos/campeonatos/campeonatos.module';
import { PistasModule } from './modulos/pistas/pistas.module';
import { CorridasModule } from './modulos/corridas/corridas.module';
import { LoginModule } from './modulos/login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HomeModule, 
    MenusModule, 
    UsersModule, 
    HttpClientModule, 
    PaisesModule,
    EquipesModule,
    CampeonatosModule,
    PistasModule,
    CorridasModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
