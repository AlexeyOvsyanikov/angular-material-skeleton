import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const MOVE_ANIMATION = trigger('moveAnimation',[
  state('left', style({
    marginLeft: '0px'
  })),
  state('right',style({
    marginLeft: '75%'
  })),
  transition('left <=> right' , [
    animate('2s ease-in-out')
  ])
]);
