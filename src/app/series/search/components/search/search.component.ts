import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';

import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzColDirective,
    NzInputDirective,
    NzButtonComponent,
    NzRowDirective,
    NzInputGroupComponent,
    NzIconDirective,
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
  query = output<string>();

  form = inject(FormBuilder).group({
    query: new FormControl('', Validators.required),
  });

  get queryValue(): string {
    const { value } = this.form.controls['query'];
    return value ? value : '';
  }

  submitForm() {
    if (this.form.valid) {
      this.query.emit(this.queryValue);
    }
  }

  resetForm() {
    this.form.reset();
  }
}
