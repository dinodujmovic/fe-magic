import { Component, Input } from "@angular/core";
import { GrowlerMessageType, ToasterService } from "@core/modules/toaster/toaster.service";
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
            this.toastContainer.removeGrowl(this.id);
        }, this.timeout);
    }
}

@Component({
    selector: "mdb-toaster",
    template: `
    <div [ngClass]="position" class="growler">
      <div *ngFor="let growl of toasts" [ngClass]="{active: growl.enabled}"
          class="growl alert {{ growl.messageType }}">
          <span class="growl-message">{{ growl.message }}</span>
      </div>
    </div>
  `,
    styleUrls: ["toaster.component.scss"]
})
export class ToasterComponent {
    private growlCount = 0;
    toasts: Toast[] = [];

    @Input() position = "bottom-right";
    @Input() timeout = 3000;

    constructor(private toasterService: ToasterService, private logger: LoggerService) {
        this.toasterService.growl = this.growl.bind(this);
    }

    growl(message: string, growlType: GrowlerMessageType): number {
        this.growlCount += 1;
        const bootstrapAlertType = GrowlerMessageType[growlType].toLowerCase();
        const messageType = `alert-${bootstrapAlertType}`;
        const toast = new Toast(this.growlCount, message, messageType, this.timeout, this);

        this.toasts.push(toast);
        return toast.id;
    }

    removeGrowl(id: number) {
        this.toasts.forEach((growl: Toast, index: number) => {
            if (growl.id === id) {
                this.toasts.splice(index, 1);
                this.growlCount -= 1;
                this.logger.log(`removed ${id}`);
            }
        });
    }
}
