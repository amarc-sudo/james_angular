import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private entete: string[];
  private tailleEntette: string[];
  private html = '';

  constructor(entete: string[], tailleEntette: string[] = null) {
    this.entete = entete;
    this.tailleEntette = tailleEntette;
  }

  debutTable(): void {
    this.html += '<div class="table-responsive">' +
      '             <table class="table" data-toggle="table" data-sort-name="id" data-sort-order="desc">';
    this.html += '<thead>' +
      '            <tr >';
    for (let i = 0; i < this.entete.length; i++) {
      this.html += '<th ' + this.tailleEntette[i] + '>' + this.entete[i] + '</th>';
    }
    this.html += '</tr></thead>';
  }

  finTable(): string {
    console.log(this.html);
    this.html += '</tbody></table></div>';
    return this.html;
  }

  addContenu(dataTable: any): void{
    this.html += '<tbody>';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < dataTable.length; i++) {
      this.newRows(null);
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < dataTable[i].length; j++) {
        this.addColumn(dataTable[i][j], null);
      }
      this.endRows();
    }
    this.html += '</tbody>';
  }

  newRows(parameters: string): void{
    this.html += '<tr ' + parameters + ' >';
  }

  endRows(): void{
    this.html += '</tr>';
  }

  addColumn(content: string, parameter: string ): void{
    this.html += '<td ' + parameter + '>' + content + '</td>';
  }


}
