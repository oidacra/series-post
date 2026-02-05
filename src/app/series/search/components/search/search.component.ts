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

/**
 * SearchComponent
 * 
 * @description
 * Component that handles the search functionality.
 * 
 * @property {Input<ComponentState>} state - The loading state of the component.
 * @property {Output<string>} searchQuery - The search query event emitter.
 * @property {Signal<{ query: string }>} queryModel - The form model (the search query).
 * @property {ReactiveForm<{ query: string }>} form - The reactive form definition with debounce logic.
 */
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
  /**
   * Input signal for the component state (e.g., 'idle', 'loading').
   */
  state = input<ComponentState>('idle');

  /**
   * Computed signal to determine if the component is in a loading state.
   */
  isLoading = computed(() => this.state() === 'loading');

  /**
   * Output event emitter for the search query.
   */
  searchQuery = output<string>();

  /**
   * Signal holding the form model (the search query).
   */
  queryModel = signal({
    query: '',
  });

  /**
   * Reactive form definition with debounce logic.
   */
  form = form(
    this.queryModel,
    schema((path) => {
      debounce(path.query, 250);
    })
  );

  /**
   * Handles form submission.
   * Emits the search query if the form is valid.
   * @param event - The form submission event.
   */
  submitForm(event: Event) {
    event.preventDefault();
    if (this.form().valid()) {
      const query = this.form.query().value();
      this.searchQuery.emit(query);
    }
  }

  /**
   * Resets the form query to an empty string.
   */
  resetForm() {
    this.queryModel.set({
      query: '',
    });
  }
}
