import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';
import { By } from '@angular/platform-browser';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { DebugElement } from '@angular/core';
import { SeriesMock } from '../../../tests/series.mocks';

describe('ResultsComponent', () => {
  let fixture: ComponentFixture<ResultsComponent>;
  let cardsElements: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);

    fixture.detectChanges();
    fixture.componentRef.setInput('series', SeriesMock);
    fixture.componentRef.setInput('state', 'loaded');
    fixture.detectChanges();
    cardsElements = fixture.debugElement.queryAll(
      By.css('nz-card[data-testId="series-card"]')
    );
  });

  it('should create nz-card with the correct number of items', () => {
    expect(cardsElements.length).toBe(SeriesMock.length);
  });

  it('should show the correct title in nz-card-meta', () => {
    const posterTitle = cardsElements[0].query(
      By.css('[data-testId="poster-title"]')
    );
    expect(posterTitle).toBeTruthy();
    expect(posterTitle.nativeElement.innerHTML).toContain(
      SeriesMock[0].show.name
    );
  });

  it('should show the correct medium image in nz-card', () => {
    const posterImage = cardsElements[0].query(
      By.css('[data-testId="poster-image"]')
    );
    expect(posterImage).toBeTruthy();
    expect(posterImage.properties['src']).toEqual(
      SeriesMock[0].show.image.medium
    );
  });

  it('should show empty component when `series` input is empty array', () => {
    fixture.componentRef.setInput('series', []);
    fixture.detectChanges();
    const emptyComponent = fixture.debugElement.query(
      By.directive(NzEmptyComponent)
    );
    expect(emptyComponent).toBeTruthy();
  });
});
