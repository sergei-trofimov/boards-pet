import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { LottieOptions } from 'lottie-react';

export const DefaultErrorPage = () => {
  const animationConfig: Partial<LottieOptions> = {
    style: {
      width: '300px',
      height: '400px',
    },
  };

  return (
    <div className="flex flex-col w-full h-screen -translate-y-24 gap-y-1 items-center justify-center font-secondary">
      <Animation animationName={AnimationsName.DEFAULT_ERROR} animationConfig={animationConfig} />
      <h3 className="text-6xl font-bold">Ooops!</h3>
      <p className="text-3xl">Something went wrong...</p>
    </div>
  );
};
