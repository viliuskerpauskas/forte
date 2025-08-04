import { Component, inject, computed } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

interface RouteData {
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private getCurrentRouteData(): RouteData {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data as RouteData;
  }

  private routeData = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.getCurrentRouteData()),
      startWith(this.getCurrentRouteData())
    ),
    { initialValue: {} as RouteData }
  );

  title = computed(() => this.routeData().title || '');
  description = computed(() => this.routeData().description || '');
}
