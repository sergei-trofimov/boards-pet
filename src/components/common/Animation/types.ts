import { AnimationConfig } from 'lottie-web';
import { AnimationsMappingType } from '@Models/animations/animations.model';

export interface AnimationProps {
  animationConfig?: AnimationConfig;
  animationName: keyof AnimationsMappingType;
}
