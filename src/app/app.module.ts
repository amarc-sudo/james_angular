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
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AjoutClasseComponent } from './pages/gestion-formation/ajout-classe/ajout-classe.component';
import { AccueilGestionFormationComponent } from './pages/gestion-formation/accueil-gestion-formation/accueil-gestion-formation.component';
import { AjoutEleveComponent } from './pages/gestion-formation/ajout-eleve/ajout-eleve.component';
import {ModifFicheComponent} from './pages/gestion-abs/fiche-absence/modif-fiche/modif-fiche.component';
import {AdminCardComponent} from './annexe-component/admin-card/admin-card.component';
import {CookieBarComponent} from './annexe-component/cookie-bar/cookie-bar.component';
import {AjoutClasseComponent} from './pages/gestion-formation/sous-menu-gestion-formation/ajout-classe/ajout-classe.component';
import {AccueilGestionFormationComponent} from './pages/gestion-formation/accueil-gestion-formation/accueil-gestion-formation.component';
import {AjoutEleveComponent} from './pages/gestion-formation/sous-menu-gestion-formation/ajout-eleve/ajout-eleve.component';
import {VisualisationFormationComponent} from './pages/gestion-formation/sous-menu-gestion-formation/visualisation-formation/visualisation-formation.component';
import {AjoutFormationComponent} from './pages/gestion-formation/sous-menu-gestion-formation/ajout-formation/ajout-formation.component';
import {NgDragDropModule} from 'ng-drag-drop';
import {ConsultationEleveComponent} from './pages/gestion-eleves/consultation-eleve/consultation-eleve.component';
import {ModificationEleveComponentComponent} from './pages/gestion-eleves/modification-eleve-component/modification-eleve-component.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {GestionSecretaireComponent} from './pages/gestion-administrateur/gestion-secretaire/gestion-secretaire.component';
import {AjoutSecretaireComponent} from './pages/gestion-administrateur/ajout-secretaire/ajout-secretaire.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SousMenuGestionFormationComponent} from './pages/gestion-formation/sous-menu-gestion-formation/sous-menu-gestion-formation.component';
import {AccueilMatiereComponent} from './pages/gestion-formation/gestion-matiere/accueil-matiere/accueil-matiere.component';
import {CreationMatiereComponent} from './pages/gestion-formation/gestion-matiere/creation-matiere/creation-matiere.component';
import {VisualisationMatiereComponent} from './pages/gestion-formation/gestion-matiere/visualisation-matiere/visualisation-matiere.component';
import {SousMenuGestionProfesseurComponent} from './pages/gestion-formation/sous-menu-gestion-professeur/sous-menu-gestion-professeur.component';
import {GestionProfesseurComponent} from './pages/gestion-formation/sous-menu-gestion-professeur/gestion-professeur/gestion-professeur.component';
import {AjoutProfesseurComponent} from './pages/gestion-formation/sous-menu-gestion-professeur/ajout-professeur/ajout-professeur.component';
import {EmargementCoursComponent} from './pages/emargement/emargement-cours/emargement-cours.component';
import {EmargementLoginComponent} from './pages/emargement/emargement-login/emargement-login.component';
import {AuthEmargementGuard} from './service/auth-emargement/auth-emargement.guard';
import {AdminLoginComponent} from './pages/gestion-administrateur/admin-login/admin-login.component';
import {AuthAdminGuard} from './service/auth-admin/auth-admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ResetComponent,
    ModalDemandeComponent,
    HistoryComponent,
    AppGestionAbsComponent,
    Safe,
    TableComponent,
    FichePreviewComponent,
    ModifFicheComponent,
    AdminPanelComponent,
    AdminCardComponent,
    CookieBarComponent,
    NotfoundComponent,
    AjoutClasseComponent,
    AccueilGestionFormationComponent,
    AjoutEleveComponent,
    VisualisationFormationComponent,
    GestionProfesseurComponent,
    AjoutFormationComponent,
    ConsultationEleveComponent,
    ModificationEleveComponentComponent,
    GestionSecretaireComponent,
    AjoutSecretaireComponent,
    AjoutProfesseurComponent,
    AccueilMatiereComponent,
    VisualisationMatiereComponent,
    CreationMatiereComponent,
    EmargementCoursComponent,
    EmargementLoginComponent,
    AdminLoginComponent,
    SousMenuGestionFormationComponent,
    SousMenuGestionProfesseurComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
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
        path: '',
        component: HomeComponent
      },
      {
        path: '**',
        component: NotfoundComponent
        path: 'accueil/gestion-formation/consultation-eleve',
        component: ConsultationEleveComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'accueil/gestion-formation/modification-eleve',
        component: ModificationEleveComponentComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'professeur/emargement-cours',
        component: EmargementCoursComponent,
        canActivate: [AuthEmargementGuard]
      },
      {
        path: 'professeur',
        component: EmargementLoginComponent
      },
      {
        path: 'loginAdmin',
        component: AdminLoginComponent
      },
      {
        path: 'admin-panel',
        component: AdminPanelComponent,
        canActivate: [AuthAdminGuard]
      }
    ]),
    OrderModule,
    NgDragDropModule.forRoot(),
    BrowserAnimationsModule,
    MatTabsModule,
    MatOptionModule,
    MatSelectModule,
    MatSelectModule,
    MatCardModule,
    DragDropModule,
    Ng2SearchPipeModule

  ],
  providers: [AuthService, AuthGuard, MatSnackBar, AuthEmargementGuard, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
