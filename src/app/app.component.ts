import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, RouterEvent , NavigationStart } from '@angular/router';

import { Subject } from 'rxjs';
import { filter , takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public title = 'Angular Material Skeleton';

  @ViewChild(MatDrawer , {static: false})
  private _sidebar!: MatDrawer;

  private _isFirstLoad = true;

  private _unsubscribe$ = new Subject<Event>();

  constructor(
    private _router: Router
  ) {
    this._router.events.pipe(
      takeUntil( this._unsubscribe$ ),
      filter((e: Event): e is RouterEvent => e instanceof NavigationStart ),
    ).subscribe((e: RouterEvent) => {

      if(this._sidebar && !this._isFirstLoad){
        this._sidebar.toggle();
      } else {
        this._isFirstLoad = false;
      }
    });
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
