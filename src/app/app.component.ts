import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Navigating back to the root route when the page is reloaded
        if (event.id === 1 && event.url === event.urlAfterRedirects) {
          this.router.navigateByUrl('/');
        }
     }
});
}
}