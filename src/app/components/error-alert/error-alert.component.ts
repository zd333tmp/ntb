import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Dumb component that shows error (if any).
 */
@Component({
  selector: 'ntb-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorAlertComponent {
  @Input() message: string;
}
