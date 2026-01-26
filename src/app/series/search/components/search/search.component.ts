import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';

import { debounce, form, FormField, schema } from '@angular/forms/signals';

import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ComponentState } from '../../../../shared/models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzColDirective,
    NzInputDirective,
    NzButtonComponent,
    NzRowDirective,
    NzInputGroupComponent,
    NzIconDirective,
    FormField,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inner-content' },
})
export class SearchComponent {
  // Signal Input
  state = input<ComponentState>('idle');

  // computed state
  isLoading = computed(() => this.state() === 'loading');

  // Signal Output
  searchQuery = output<string>();

  queryModel = signal({
    query: '',
  });

  form = form(
    this.queryModel,
    schema((path) => {
      debounce(path.query, 250);
    })
  );

  submitForm(event: Event) {
    event.preventDefault();
    if (this.form().valid()) {
      const query = this.form.query().value();
      this.searchQuery.emit(query);
    }
  }

  resetForm() {
    this.queryModel.set({
      query: '',
    });
  }
}
