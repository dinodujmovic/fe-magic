import { Injectable } from '@angular/core';

export interface IModalContent {
  header?: string;
  body?: string;
  cancelButtonText?: string;
  OKButtonText?: string;
  cancelButtonVisible?: boolean;
}

@Injectable()
export class ModalService {
    show: (modalContent: IModalContent) => Promise<boolean> = () => { return {} as Promise<boolean>; };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    hide: () => void = () => {};
}
