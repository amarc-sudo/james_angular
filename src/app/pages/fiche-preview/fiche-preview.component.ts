import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Cours} from '../../api/objects/Cours';
import {CoursService} from '../../service/api/cours.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-fiche-preview',
  templateUrl: './fiche-preview.component.html',
  styleUrls: ['./fiche-preview.component.css']
})
export class FichePreviewComponent implements OnInit, OnDestroy {

  listCours$: Observable<Cours[]>;

  idFormation: number;

  date: string;


  subscriptions: Subscription[] = [];

  constructor(private coursService: CoursService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idFormation = params['id'];
      this.date = params['date'];
    });
    console.log(this.idFormation);
    console.log(this.date);
    if (this.idFormation !== undefined && this.date !== undefined) {
      this.listCours$ = this.coursService.listByFormationAndDate(this.idFormation, this.date);

      this.subscriptions.push(this.listCours$.subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach(subscription => subscription.unsubscribe());
  }

}
