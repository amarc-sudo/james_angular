import {DomSanitizer} from '@angular/platform-browser';
import {Pipe} from '@angular/core';

@Pipe({name: 'safeHtml'})
// tslint:disable-next-line:class-name
export class safe {
  constructor(private sanitizer: DomSanitizer){}

  // tslint:disable-next-line:typedef
  transform(style) {
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }
}

