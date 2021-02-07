import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SEARCH_ANIMATION = trigger('searchAnimation' , [
  state('start',style({
    marginLeft: '-100%',
  })),
  state('end',style({
    marginLeft: '0'
  })),
  transition('start <=> end', [
    animate('0.2s ease-in-out')
  ])
]);
