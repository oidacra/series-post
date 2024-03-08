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

  describe('[GOOD] Tests', () => {
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
      fixture.componentRef.setInput('isLoading', false);
      fixture.detectChanges();

      // assert
      expect(button.injector.get(NzButtonComponent).nzLoading).toBe(false);

      // arrange
      fixture.componentRef.setInput('isLoading', true);
      fixture.detectChanges();

      // assert
      expect(button.injector.get(NzButtonComponent).nzLoading).toBe(true);
    });

    it('should emit form value when the user clicks the button and form is valid', async () => {
      const expectedEmittedQueryValue = 'test'; // Mock data
      component.form.setValue({ query: expectedEmittedQueryValue });
      component.form.markAsTouched();

      // Espiamos 2 métodos
      const submitSpy = jest.spyOn(component, 'submitForm');
      const outputSpy = jest.spyOn(component.query, 'emit');

      // Buscamos el botón
      const button = de.nativeElement.querySelector(
        '[data-testId="submit-button"]'
      );

      // Verificamos que no sea null
      expect(button).not.toBeNull();

      // Simulamos la interacción
      button.click();

      // Asserts
      expect(component.form.valid).toBe(true); // El formulario es válido?
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
        component.form.setValue({ query: 'test' });
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
        component.form.setValue({ query: 'test' });
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
        expect(component.form.controls['query'].value).toBeNull();
      });
    });
  });

  describe('[BAD] - Tests', () => {
    // Borro el boton y el test aun pass
    it('should emit form value when the submitForm() is called', async () => {
      component.form.setValue({ query: 'test' });
      component.form.markAsTouched();

      // Espiamos 2 métodos
      const submitSpy = jest.spyOn(component, 'submitForm');
      const outputSpy = jest.spyOn(component.query, 'emit');

      // llamamos a submitForm
      component.submitForm();

      // Asserts
      expect(component.form.valid).toBe(true); // El formulario es válido?
      expect(submitSpy).toHaveBeenCalled(); // el método fue llamado con el click del botón?
      expect(outputSpy).toHaveBeenCalledWith('test'); // Si es válido, emitió el valor de query?
    });

    // no utilizar clases en vez de data-testId, si cambio la class rompo el test
    it('form should be reset when click clear icon', async () => {
      // Arrange
      component.form.setValue({ query: 'test' });
      fixture.detectChanges();

      // Assert
      await fixture.whenStable();
      const clearIcon = de.nativeElement.querySelector('.ant-input-clear-icon');
      expect(clearIcon).not.toBeNull();

      // Act
      jest.spyOn(component, 'resetForm');
      clearIcon.click();

      // Assert
      expect(component.resetForm).toHaveBeenCalled();
      expect(component.form.controls['query'].value).toBeNull();
    });
  });
});
