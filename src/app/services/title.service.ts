import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private router = inject(Router);
  private title = inject(Title);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.initializeTitleUpdates();
  }

  private initializeTitleUpdates(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  private updateTitle(): void {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const routeTitle = route.snapshot.data['title'];

    if (routeTitle) {
      this.title.setTitle(`${routeTitle} | Forte`);
    } else {
      this.title.setTitle('Forte');
    }
  }
}
