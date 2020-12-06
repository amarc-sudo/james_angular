import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard} from './service/auth/auth.guard';
import {AuthService} from './service/auth/auth.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ResetComponent } from './pages/reset/reset.component';
import {ModalDemandeComponent} from './modal/demandeReset/modal-demande.component';
import { HistoryComponent } from './pages/history/history.component';
import { AppGestionAdmComponent } from './pages/gestion-adm/app-gestion-adm/app-gestion-adm.component';
import { AppGestionAbsComponent } from './pages/gestion-abs/app-gestion-abs/app-gestion-abs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ResetComponent,
    ModalDemandeComponent,
    HistoryComponent,
    AppGestionAdmComponent,
    AppGestionAbsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'reset',
        component: ResetComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/historique',
        component: HistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/gestion-adm',
        component: AppGestionAdmComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/gestion-abs',
        component: AppGestionAbsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
