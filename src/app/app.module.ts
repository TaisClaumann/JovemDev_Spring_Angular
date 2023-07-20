import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampeonatosModule } from './modulos/campeonatos/campeonatos.module';
import { CorridasPorPaisAnoModule } from './modulos/corridas-por-pais-ano/corridas-por-pais-ano.module';
import { CorridasModule } from './modulos/corridas/corridas.module';
import { EquipesModule } from './modulos/equipes/equipes.module';
import { HomeModule } from './modulos/home/home.module';
import { LoginModule } from './modulos/login/login.module';
import { MenusModule } from './modulos/menus/menus.module';
import { PaisesModule } from './modulos/paises/paises.module';
import { PilotosCorridasModule } from './modulos/pilotos-corridas/pilotos-corridas.module';
import { PilotosPorPaisCorridaModule } from './modulos/pilotos-por-pais-corrida/pilotos-por-pais-corrida.module';
import { PilotosModule } from './modulos/pilotos/pilotos.module';
import { PistasModule } from './modulos/pistas/pistas.module';
import { UsersModule } from './modulos/users/users.module';

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
    LoginModule,
    PilotosModule,
    PilotosCorridasModule,
    CorridasPorPaisAnoModule,
    PilotosPorPaisCorridaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
