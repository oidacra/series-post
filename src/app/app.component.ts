import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
} from 'ng-zorro-antd/layout';
import { NzBreadCrumbComponent } from 'ng-zorro-antd/breadcrumb';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NzContentComponent,
    NzBreadCrumbComponent,
    NzFooterComponent,
    NzHeaderComponent,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
