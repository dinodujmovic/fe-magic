import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ToasterService, GrowlerMessageType } from './toaster.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'mdb-toaster',
  template: `
    <div [ngClass]="position" class="growler">
      <div *ngFor="let growl of growls" [ngClass]="{active: growl.enabled}"
          class="growl alert {{ growl.messageType }}">
          <span class="growl-message">{{ growl.message }}</span>
      </div>
    </div>
  `,
  styleUrls: ['toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  private growlCount = 0;
  growls: Growl[] = [];

  @Input() position = 'bottom-right';
  @Input() timeout = 3000;

  constructor(private growlerService: ToasterService,
    private logger: LoggerService) {
    growlerService.growl = this.growl.bind(this);
  }

  ngOnInit() { }

  /**
  * Displays a growl message.
  *
  * @param {string} message - The message to display.
  * @param {GrowlMessageType} growlType - The type of message to display (a GrowlMessageType enumeration)
  * @return {number} id - Returns the ID for the generated growl
  */
  growl(message: string, growlType: GrowlerMessageType): number {
    this.growlCount++;
    const bootstrapAlertType = GrowlerMessageType[growlType].toLowerCase();
    const messageType = `alert-${bootstrapAlertType}`;

    const growl = new Growl(this.growlCount, message, messageType, this.timeout, this);
    this.growls.push(growl);
    return growl.id;
  }

  removeGrowl(id: number) {
    this.growls.forEach((growl: Growl, index: number) => {
      if (growl.id === id) {
        this.growls.splice(index, 1);
        this.growlCount--;
        this.logger.log('removed ' + id);
      }
    });
  }
}

class Growl {

  enabled: boolean = false;
  timeoutId: number = 0;

  constructor(public id: number,
    public message: string,
    public messageType: string,
    private timeout: number,
    private growlerContainer: ToasterComponent) {
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
      this.growlerContainer.removeGrowl(this.id);
    }, this.timeout);
  }

}
