import { Injectable } from "@angular/core";

export enum GrowlerMessageType {
  Success,
  Danger,
  Warning,
  Info
}

@Injectable()
export class ToasterService {
    growl: (message: string, growlType: GrowlerMessageType) => number = () => 0;
}
