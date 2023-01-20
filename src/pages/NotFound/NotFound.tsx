import { Animation } from '@Common';
import { AnimationsName } from '@Models/animations/animations.model';
import { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col w-full h-screen -translate-y-24 gap-y-1 items-center justify-center font-secondary">
      <Animation animationName={AnimationsName.NOT_FOUND} />
      <h2 className="text-xxl font-bold">There&rsquo;s NOTHING here...</h2>
      <p className="text-3xl">...maybe the page you&rsquo;re looking for is not found or never existed.</p>
    </div>
  );
};

export default NotFoundPage;
