import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SCALE_ANIMATION = trigger('scaleAnimation', [
  state(
    'scale-start',
    style({
      width: '300px',
      height: '300px',
      opacity: '1',
    })
  ),
  state(
    'scale-end',
    style({
      width: '0px',
      height: '0px',
      opacity: '0',
    })
  ),
  transition('scale-end <=> scale-start', [animate('0.3s ease-in-out')]),
]);

export const OPACITY_ANIMATION = trigger('opacityAnimation', [
  state(
    'small-font',
    style({
      opacity: '0',
    })
  ),
  state(
    'big-font',
    style({
      opacity: '1',
    })
  ),
  transition('small-font <=> big-font', [animate('0.3s')]),
]);
