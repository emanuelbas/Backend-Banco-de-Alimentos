import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './modules/beneficiario/todolist/todolist.component';
import {ReactiveFormsModule} from '@angular/forms';
import { Item } from './data/model/Item';
import {MockItemsService} from './data/services/mock-items.service';
import { NewItemComponent } from './modules/beneficiario/new-item/new-item.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';
import { RegistrarBeneficiarioComponent } from './modules/beneficiario/registrar-beneficiario/registrar-beneficiario.component';
import { RegistrarDonanteComponent } from './modules/donante/registrar-donante/registrar-donante.component';
import { RegistrarVoluntarioComponent } from './modules/voluntario/registrar-voluntario/registrar-voluntario.component';
import { LoginComponent } from './modules/login/login.component';
import { PerfilVoluntarioComponent } from './modules/voluntario/perfil-voluntario/perfil-voluntario.component';


import { SDKBrowserModule } from './_services/lbservice';
import { VerBeneficiariosComponent } from './modules/beneficiario/ver-beneficiarios/ver-beneficiarios.component';


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    NewItemComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegistrarBeneficiarioComponent,
    RegistrarDonanteComponent,
    RegistrarVoluntarioComponent,
    LoginComponent,
    PerfilVoluntarioComponent,
    VerBeneficiariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
	SDKBrowserModule.forRoot()
  ],
  providers: [MockItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


