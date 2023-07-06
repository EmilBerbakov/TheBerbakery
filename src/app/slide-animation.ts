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
    //When going from home to a recipe, slide content out to the left and in from the right
      transition('Home => Recipe', [
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
      //When going from a recipe to home, slide content out to the right and in from the left
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
      //When you first load into The Berbakery / manually navigate to a page through the URL, slide content in from the bottom
      transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '60%' }), { optional: true }),
        group([
            query(':enter', [
                style({ transform: 'translateY(900%)' }),
                animate('.75s ease-in-out', style({ transform: 'translateX(0%)', opacity: '100%' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('.75s ease-in-out', style({ transform: 'translateX(100%)', opacity: '0%' }))
            ], { optional: true }),
        ])
    ]),

  ]);
