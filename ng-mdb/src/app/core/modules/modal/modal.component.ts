import { Component } from '@angular/core';
import { IModalContent, ModalService } from '@core/modules/modal/modal.service';

@Component({
    selector: 'mdb-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ]
})
export class ModalComponent {

    modalVisible = false;
    modalVisibleAnimate = false;
    modalContent: IModalContent = {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cancel: () => void = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ok: () => void = () => {};
    defaultModalContent: IModalContent = {
        header: 'Please Confirm',
        body: 'Are you sure you want to continue?',
        cancelButtonText: 'Cancel',
        OKButtonText: 'OK',
        cancelButtonVisible: true
    };

    constructor(private modalService: ModalService) {
        modalService.show = this.show.bind(this);
        modalService.hide = this.hide.bind(this);
    }

    show(modalContent: IModalContent) {
        this.modalContent = Object.assign(this.defaultModalContent, modalContent);
        this.modalVisible = true;
        setTimeout(() => this.modalVisibleAnimate = true);

        const promise = new Promise<boolean>((resolve) => {
            this.cancel = () => {
                this.hide();
                resolve(false);
            };
            this.ok = () => {
                this.hide();
                resolve(true);
            };
        });
        return promise;
    }

    hide() {
        this.modalVisibleAnimate = false;
        setTimeout(() => this.modalVisible = false, 300);
    }

}
