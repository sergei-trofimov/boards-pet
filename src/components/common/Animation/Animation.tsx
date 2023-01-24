import { LottieOptions, useLottie } from 'lottie-react';
import { AnimationProps } from './types';
import { AnimationsMappingType } from '@Models/animations/animations.model';
import { AnimationsName } from '@Constants/animations-name.constant';
import { FC } from 'react';
import NotFound from '@Animations';

const animationsMapping: AnimationsMappingType = {
  [AnimationsName.NOT_FOUND]: NotFound,
};

export const Animation: FC<AnimationProps> = ({ animationConfig, animationName }) => {
  const options: LottieOptions = {
    loop: true,
    ...animationConfig,
    animationData: animationsMapping[animationName],
  };

  const { View } = useLottie(options);

  return <>{View}</>;
};
