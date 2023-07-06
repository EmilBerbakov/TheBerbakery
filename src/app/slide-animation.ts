import {
  transition,
  trigger,
  query,
  style,
  animate,
  group
} from '@angular/animations';


export const slideInAnimation =
  trigger('routeAnimations', [
      transition('Home => *', [
          query(':enter, :leave', style({ position: 'fixed', width: '60%' }), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(100%)' }),
                  animate('.5s ease-in-out', style({ transform: 'translateX(0%)', opacity: '100%' }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('.5s ease-in-out', style({ transform: 'translateX(-100%)', opacity: '0%' }))
              ], { optional: true }),
          ])
      ]),
      transition('Recipe => Home', [
          query(':enter, :leave', style({ position: 'fixed', width: '60%' }), { optional: true }),
          group([
              query(':enter', [
                  style({ transform: 'translateX(-100%)' }),
                  animate('.5s ease-in-out', style({ transform: 'translateX(0%)', opacity: '100%' }))
              ], { optional: true }),
              query(':leave', [
                  style({ transform: 'translateX(0%)' }),
                  animate('.5s ease-in-out', style({ transform: 'translateX(100%)', opacity: '0%' }))
              ], { optional: true }),
          ])
      ]),
  ]);
