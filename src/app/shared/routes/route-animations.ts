import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
} from '@angular/animations';

const animationTiming = '0.3s ease-in-out';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)', opacity: '0' }),
          animate(
            animationTiming,
            style({ transform: 'translateX(0%)', opacity: '1' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)', opacity: '1' }),
          animate(
            animationTiming,
            style({ transform: 'translateX(100%)', opacity: '0' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
