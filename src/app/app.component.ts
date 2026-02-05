import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';

/**
 * AppComponent
 *
 * @description
 * The root component of the application.
 *
 * @property {number} year - The current year.
 */
@Component({
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * The current year.
   * Used for the footer copyright or year display.
   */
  readonly year = new Date().getFullYear();
}
