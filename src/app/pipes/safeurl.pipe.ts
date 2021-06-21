import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
 
@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(value: any, args?: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
 
}