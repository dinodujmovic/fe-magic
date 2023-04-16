import { Injectable } from "@angular/core";

export enum ToastMessageType {
    Success,
    Error,
    Warning,
    Info
}

@Injectable()
export class ToasterService {
    toast: (message: string, toastType: ToastMessageType) => number = () => 0;
}
