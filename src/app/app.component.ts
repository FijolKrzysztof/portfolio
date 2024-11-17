import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { AnimatedProjectsComponent } from './components/code-to-ui.component';
import { AnimatedProjectsComponent } from './components/animated-projects/animated-projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AnimatedProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  innerHtml!: SafeHtml;

  readonly http = inject(HttpClient);
  readonly sanitizer = inject(DomSanitizer);


  ngOnInit() {
    this.http.get('assets/improved-animation.html', { responseType: 'text' })
      .subscribe(content => {
        this.innerHtml = this.sanitizer.bypassSecurityTrustHtml(content);
      });
  }
}
