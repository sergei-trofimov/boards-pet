import { Button } from '@Common/Button/Button';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  onAgree: (...args: any[]) => Promise<any>;
  onCancel: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({ onAgree, onCancel, children }) => {
  useEffect(() => {
    // document.body.classList.add('overflow-hidden');

    return () => {
      // document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleAgreeClick = async () => {
    setIsLoading(true);
    try {
      await onAgree();
    } catch (error) {
      throw new Error('Somethims went wrong!');
    } finally {
      setIsLoading(false);
      onCancel();
    }
  };

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-gray-300 opacity-80"
        onClick={() => {
          if (!isLoading) {
            onCancel();
          }
        }}
      ></div>
      <div className="modal-window">
        <div className="flex flex-col justify-between h-full bg-white grow p-4">{children}</div>
        <div className="flex justify-end gap-x-3 p-4 bg-gray-100">
          <Button loading={isLoading} primary classNames="max-w-24" onClickHandler={handleAgreeClick}>
            Agree
          </Button>
          <Button loading={isLoading} primary classNames="max-w-24" onClickHandler={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </>,
    document.getElementById('overlay-container')
  );
};

export default Modal;
