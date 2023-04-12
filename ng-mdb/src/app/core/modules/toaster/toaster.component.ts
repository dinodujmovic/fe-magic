import { Component, Input } from "@angular/core";
import { ToasterService, ToastMessageType } from "@core/modules/toaster/toaster.service";
import { LoggerService } from "@core/services/logger.service";

class Toast {
    enabled = false;

    // timeoutId = 0;

    constructor(
        public id: number,
        public message: string,
        public messageType: string,
        private timeout: number,
        // eslint-disable-next-line no-use-before-define
        private toastContainer: ToasterComponent
    ) {
        this.show();
    }

    show() {
        window.setTimeout(() => {
            this.enabled = true;
            this.setTimeout();
        }, 0);
    }

    setTimeout() {
        window.setTimeout(() => {
            this.hide();
        }, this.timeout);
    }

    hide() {
        this.enabled = false;
        window.setTimeout(() => {
            this.toastContainer.removeToast(this.id);
        }, this.timeout);
    }
}

@Component({
    selector: "mdb-toaster",
    template: `
        <div>
            <div *ngFor="let toast of toasts" [ngClass]="{active: toast.enabled}"
                 class="toast {{position}}">
                <div class="alert {{ toast.messageType }}">
                    {{ toast.message }}
                </div>
            </div>
        </div>
    `,
})
export class ToasterComponent {
    private toastCount = 0;
    toasts: Toast[] = [];

    // https://daisyui.com/components/toast/
    @Input() position = "toast-bottom toast-end";
    @Input() timeout = 3000;

    constructor(private toasterService: ToasterService, private logger: LoggerService) {
        this.toasterService.toast = this.toast.bind(this);
    }

    toast(message: string, toastType: ToastMessageType): number {
        this.toastCount += 1;
        const bootstrapAlertType = ToastMessageType[toastType].toLowerCase();
        const messageType = `alert-${bootstrapAlertType}`;
        const toast = new Toast(this.toastCount, message, messageType, this.timeout, this);

        this.toasts.push(toast);
        return toast.id;
    }

    removeToast(id: number) {
        this.toasts.forEach((toast: Toast, index: number) => {
            if (toast.id === id) {
                this.toasts.splice(index, 1);
                this.toastCount -= 1;
                this.logger.log(`removed ${id}`);
            }
        });
    }
}
