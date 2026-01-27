import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NzButtonComponent } from 'ng-zorro-antd/button';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    de = fixture.debugElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe(`SearchComponent`, () => {
    it('should exist a input for the query control', () => {
      const queryInput = de.nativeElement.querySelector(
        '[data-testId="query-input"]'
      );
      expect(queryInput).not.toBeNull();
    });

    it('should show loading button when input is loading `true`', () => {
      // arrange
      const button = fixture.debugElement.query(
        By.directive(NzButtonComponent)
      );
      expect(button).not.toBeNull();

      // act
      fixture.componentRef.setInput('state', 'idle');
      fixture.detectChanges();

      // assert
      expect(button.injector.get(NzButtonComponent).nzLoading).toBe(false);

      // arrange
      fixture.componentRef.setInput('state', 'loading');
      fixture.detectChanges();

      // assert
      expect(button.injector.get(NzButtonComponent).nzLoading).toBe(true);
    });

    it('should emit form value when the user clicks the button and form is valid', async () => {
      const expectedEmittedQueryValue = 'test'; // Mock data
      component.queryModel.set({ query: expectedEmittedQueryValue });

      // Espiamos 2 métodos
      const submitSpy = jest.spyOn(component, 'submitForm');
      const outputSpy = jest.spyOn(component.searchQuery, 'emit');

      // Buscamos el botón
      const button = de.nativeElement.querySelector(
        '[data-testId="submit-button"]'
      );

      // Verificamos que no sea null
      expect(button).not.toBeNull();

      // Simulamos la interacción
      button.click();

      // Asserts
      expect(component.form().valid()).toBe(true); // El formulario es válido?
      expect(submitSpy).toHaveBeenCalled(); // el método fue llamado con el click del botón?
      expect(outputSpy).toHaveBeenCalledWith(expectedEmittedQueryValue); // Si es válido, emitió el valor de query?
    });

    describe('Clear icon', () => {
      it('clear icon should not be present if query is empty', () => {
        // Assert
        const clearIcon = de.nativeElement.querySelector(
          '[data-testId="reset-icon"]'
        );
        expect(clearIcon).toBeNull();
      });
      it('clear icon should be present if query has value', async () => {
        // Act
        component.queryModel.set({ query: 'test' });
        fixture.detectChanges();

        // Assert
        await fixture.whenStable();
        const clearIcon = de.nativeElement.querySelector(
          '[data-testId="reset-icon"]'
        );
        expect(clearIcon).not.toBeNull();
      });
      it('form should be reset when click clear icon', async () => {
        // Arrange
        component.queryModel.set({ query: 'test' });
        fixture.detectChanges();

        // Assert
        await fixture.whenStable();
        const clearIcon = de.nativeElement.querySelector(
          '[data-testId="reset-icon"]'
        );
        expect(clearIcon).not.toBeNull();

        // Act
        jest.spyOn(component, 'resetForm');
        clearIcon.click();

        // Assert
        expect(component.resetForm).toHaveBeenCalled();
        expect(component.form.query().value()).toBe('');
      });
    });
  });
});
