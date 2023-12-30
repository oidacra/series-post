import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesComponent } from './series.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
