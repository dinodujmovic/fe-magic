import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "mdb-error-alert",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div *ngIf="error" class="mdb-error-alert alert alert-error shadow-lg">
            <span>{{ error }}</span>
        </div>
    `,
})
export class ErrorAlertComponent {
    @Input() error = "";
}
