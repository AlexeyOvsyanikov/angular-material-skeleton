import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { delay, map, startWith, tap, takeUntil } from 'rxjs/operators';

import { SCALE_ANIMATION , OPACITY_ANIMATION } from './animation/scale.and.opacity.animation';
import { MOVE_ANIMATION } from './animation/move.animation';
import { SEARCH_ANIMATION } from './animation/search.animation';
import { ICity } from './interface/city.interface';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  animations: [
    SCALE_ANIMATION,
    OPACITY_ANIMATION,
    MOVE_ANIMATION,
    SEARCH_ANIMATION,
  ],
})
export class AnimationsComponent implements OnInit , OnDestroy{
  public opacityAndScaleAnimationRun = false;
  public moveAnimationRun = false;
  public searchAnimationRun = false;

  public searchControl = new FormControl();
  private _cities: ICity[] = [
    {
      title: 'Moscow',
    },
    {
      title: 'Minsk',
    },
    {
      title: 'Kyiv',
    },
    {
      title: 'Kishinev',
    },
    {
      title: 'Saint Petersburg',
    },
    {
      title: 'Thessaloniki',
    },
  ];

  public filteredCities!: Observable<ICity[]>;
  public _unsubscribe$ = new Subject<void>();

  constructor() {}

  public ngOnInit(): void {

    let itemsAmount = this._cities.length;

    this.filteredCities = this.searchControl.valueChanges.pipe(
      startWith(''),
      map( (titlePart) => this._filter(titlePart)),
      tap( ( cities ) => {
        if(cities.length != itemsAmount){
          this.searchAnimationRun = true;
        }
      }),
      delay(300),
      tap( ( cities ) => {
        if(cities.length != itemsAmount){
          this.searchAnimationRun = false;
          itemsAmount = cities.length;
        }
      } ),
      takeUntil(this._unsubscribe$)
    );

  }

  public toggleOpacityAndScaleAnimation() {
    this.opacityAndScaleAnimationRun = !this.opacityAndScaleAnimationRun;
  }

  public toggleMoveAnimation() {
    this.moveAnimationRun = !this.moveAnimationRun;
  }

  private _filter(cityTitlePart: string): ICity[] {
    const title = cityTitlePart.toLowerCase();

    return this._cities.filter( (city) => city.title.toLowerCase().indexOf(title) === 0);
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
