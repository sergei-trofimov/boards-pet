import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { FC } from 'react';

export const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col w-full h-screen -translate-y-24 gap-y-1 items-center justify-center font-secondary">
      <Animation animationName={AnimationsName.NOT_FOUND} />
      <h2 className="text-xxl font-bold">There&rsquo;s NOTHING here...</h2>
      <p className="text-3xl">...maybe the page you&rsquo;re looking for is not found or never existed.</p>
    </div>
  );
};
