import { AnimationsMappingType, AnimationsName } from '@Models/animations/animations.model';
import { LottieOptions, useLottie } from 'lottie-react';
import { AnimationProps } from './types';
import { FC } from 'react';
import { NotFound } from '@Animations';

const animationsMapping: AnimationsMappingType = {
  [AnimationsName.NOT_FOUND]: NotFound,
};

const Animation: FC<AnimationProps> = ({ animationConfig, animationName }) => {
  const options: LottieOptions = {
    loop: true,
    ...animationConfig,
    animationData: animationsMapping[animationName],
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};

export default Animation;
