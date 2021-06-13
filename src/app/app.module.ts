import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './pages/admin/admin.component';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './service/auth-session/auth.guard';
import {AuthService} from './service/api/auth.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ResetComponent} from './pages/reset/reset.component';
import {ModalDemandeComponent} from './annexe-component/modal/demandeReset/modal-demande.component';
import {HistoryComponent} from './pages/gestion-abs/history/history.component';
import {AppGestionAdmComponent} from './pages/gestion-adm/app-gestion-adm/app-gestion-adm.component';
import {AppGestionAbsComponent} from './pages/gestion-abs/panel-fiche/app-gestion-abs.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Safe} from './service/SafeHTML/safe';
import {TableComponent} from './annexe-component/table/table.component';
import {FichePreviewComponent} from './pages/gestion-abs/fiche-absence/fiche-preview/fiche-preview.component';
import {OrderModule} from 'ngx-order-pipe';
import { ModifFicheComponent } from './pages/gestion-abs/fiche-absence/modif-fiche/modif-fiche.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminCardComponent } from './annexe-component/admin-card/admin-card.component';
import { CookieBarComponent } from './annexe-component/cookie-bar/cookie-bar.component';
import { AjoutClasseComponent } from './pages/gestion-formation/ajout-classe/ajout-classe.component';
import { AccueilGestionFormationComponent } from './pages/gestion-formation/accueil-gestion-formation/accueil-gestion-formation.component';
import { AjoutEleveComponent } from './pages/gestion-formation/ajout-eleve/ajout-eleve.component';
import { VisualisationFormationComponent } from './pages/gestion-formation/visualisation-formation/visualisation-formation.component';
import { AjoutFormationComponent } from './pages/gestion-formation/ajout-formation/ajout-formation.component';
import {GestionProfesseurComponent} from './pages/gestion-formation/gestion-professeur/gestion-professeur.component';
import {NgDragDropModule} from 'ng-drag-drop';
import { ConsultationEleveComponent } from './pages/gestion-eleves/consultation-eleve/consultation-eleve.component';
import { ModificationEleveComponentComponent } from './pages/gestion-eleves/modification-eleve-component/modification-eleve-component.component';

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
    Safe,
    TableComponent,
    FichePreviewComponent,
    ModifFicheComponent,
    AdminPanelComponent,
    AdminCardComponent,
    CookieBarComponent,
    AjoutClasseComponent,
    AccueilGestionFormationComponent,
    AjoutEleveComponent,
    VisualisationFormationComponent,
    GestionProfesseurComponent,
    AjoutFormationComponent,
    ConsultationEleveComponent,
    ModificationEleveComponentComponent,
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
        path: 'accueil',
        component: AdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/historique',
        component: HistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-adm',
        component: AppGestionAdmComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-abs',
        component: AppGestionAbsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin-panel',
        component: AdminPanelComponent,
      },
      {
        path: 'accueil/gestion-abs/fiche-presence',
        component: FichePreviewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/historique/fiche-presence',
        component: FichePreviewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-abs/fiche-presence/modification',
        component: ModifFicheComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-abs/fiche-presence/modification',
        component: ModifFicheComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-formation',
        component: AccueilGestionFormationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-formation/consultation-eleve',
        component: ConsultationEleveComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-formation/modification-eleve',
        component: ModificationEleveComponentComponent,
        canActivate: [AuthGuard]
      },
    ]),
    OrderModule,
    NgDragDropModule.forRoot()

  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
