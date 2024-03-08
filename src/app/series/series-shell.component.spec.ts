import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesShellComponent } from './series-shell.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeriesComponent', () => {
  let component: SeriesShellComponent;
  let fixture: ComponentFixture<SeriesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesShellComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
