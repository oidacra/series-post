import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	input,
	Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	NzFormControlComponent,
	NzFormDirective,
	NzFormItemComponent,
	NzFormLabelComponent
} from 'ng-zorro-antd/form';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [
		CommonModule,
		NzFormDirective,
		ReactiveFormsModule,
		NzFormItemComponent,
		NzFormLabelComponent,
		NzFormControlComponent,
		NzColDirective,
		NzInputDirective,
		NzButtonComponent,
		NzRowDirective,
		NzInputGroupComponent,
		NzIconDirective
	],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: { class: 'inner-content' }
})
export class SearchComponent {
	// Signal Input
	isLoading = input(false);

	@Output()
	query = new EventEmitter<string>();

	form = inject(FormBuilder).group({
		query: new FormControl('', Validators.required)
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
