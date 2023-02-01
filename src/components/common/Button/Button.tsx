import { ButtonClassesMapperType, ButtonProps, ButtonRole } from './types';
import { FC, PropsWithChildren } from 'react';
import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { LottieOptions } from 'lottie-react';
import { buildClassesByAttributes } from '@Utils/build-classes-by-attributes.function';
import { twMerge } from 'tailwind-merge';

const ButtonClassesMapper: ButtonClassesMapperType = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  horizontalCentered: 'mx-auto',
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  classNames,
  type = 'button',
  onClickHandler,
  loading,
  ...rest
}) => {
  const classesByAttributes: string = buildClassesByAttributes<ButtonRole>(rest, ButtonClassesMapper);
  const classes = twMerge(`${classNames || ''} ${classesByAttributes}`.trim());

  const animationConfig: Partial<LottieOptions> = {
    style: {
      height: '100%',
    },
  };

  return (
    <button disabled={loading} type={type} className={classes} onClick={onClickHandler || null}>
      {loading ? <Animation animationName={AnimationsName.CIRCLE_LOADER} animationConfig={animationConfig} /> : children}
    </button>
  );
};
