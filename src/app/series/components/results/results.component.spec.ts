import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { By } from '@angular/platform-browser';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Serie } from '../../shared/series.models';
import { DebugElement } from '@angular/core';

// Mock de la data
const seriesMock: Serie[] = [
	{
		score: 0.70492816,
		show: {
			id: 169,
			name: 'Breaking Bad',
			image: {
				medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/501/1253519.jpg',
				original: 'https://static.tvmaze.com/uploads/images/original_untouched/501/1253519.jpg'
			},
			summary:
				"<p><b>Breaking Bad</b> follows protagonist Walter White, a chemistry teacher who lives in New Mexico with his wife and teenage son who has cerebral palsy. White is diagnosed with Stage III cancer and given a prognosis of two years left to live. With a new sense of fearlessness based on his medical prognosis, and a desire to secure his family's financial security, White chooses to enter a dangerous world of drugs and crime and ascends to power in this world. The series explores how a fatal diagnosis such as White's releases a typical man from the daily concerns and constraints of normal society and follows his transformation from mild family man to a kingpin of the drug trade.</p>"
		}
	}
];

describe('ResultsComponent', () => {
	let component: ResultsComponent;
	let fixture: ComponentFixture<ResultsComponent>;
	let de: DebugElement;
	let cardsElements: DebugElement[];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ResultsComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ResultsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		fixture.componentRef.setInput('series', seriesMock);
		fixture.detectChanges();
		cardsElements = fixture.debugElement.queryAll(By.css('nz-card[data-testId="series-card"]'));
	});

	it('should create nz-card with the correct number of items', () => {
		expect(cardsElements.length).toBe(seriesMock.length);
	});

	it('should show the correct title in nz-card-meta', () => {
		const posterTitle = cardsElements[0].query(By.css('[data-testId="poster-title"]'));
		expect(posterTitle).toBeTruthy();
		expect(posterTitle.nativeElement.innerHTML).toContain(seriesMock[0].show.name);
	});

	it('should show the correct medium image in nz-card', () => {
		const posterImage = cardsElements[0].query(By.css('[data-testId="poster-image"]'));
		expect(posterImage).toBeTruthy();
		expect(posterImage.properties['src']).toEqual(seriesMock[0].show.image.medium);
	});

	it('should show empty component when `series` input is empty array', () => {
		fixture.componentRef.setInput('series', []);
		fixture.detectChanges();
		const emptyComponent = fixture.debugElement.query(By.directive(NzEmptyComponent));
		expect(emptyComponent).toBeTruthy();
	});
});
