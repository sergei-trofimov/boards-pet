import { AnimationsMappingType } from '@Types/animations/animations.model';
import { LottieOptions } from 'lottie-react';

export interface AnimationProps {
  animationConfig?: Partial<LottieOptions>;
  animationName: keyof AnimationsMappingType;
}
