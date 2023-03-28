import { UIApi } from '@Helpers/api/ui-api';
import { InviteUserPayload } from '@Types/api/invite-user-payload.model';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '../store';

type ModalProps = {
  onAgree: (...args: any[]) => Promise<any> | any;
  onCancel: () => void;
};

const uiApi = UIApi.Instance;

export class UIStore {
  modalIsOpen = false;
  element: JSX.Element = null;
  modalProps: ModalProps;

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  openModal = (element: JSX.Element, modalProps: Omit<ModalProps, 'onCancel'>): void => {
    this.modalIsOpen = true;
    this.element = element;
    this.modalProps = {
      ...modalProps,
      onCancel: this.closeModal,
    };
  };

  closeModal = (): void => {
    this.modalIsOpen = false;
    this.element = null;
    this.modalProps = null;
  };

  sendInvitation = async (payload: InviteUserPayload): Promise<{ status: string }> => {
    return uiApi.inviteUserAsync(payload);
  };
}
