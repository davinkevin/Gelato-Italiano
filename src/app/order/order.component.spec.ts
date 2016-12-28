/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { OrderComponent } from './order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ OrderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.autoDetectChanges();
  });

  it('should create the OrderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid if all conditions of form are fulfilled', async(() => {
    /* Given */
    const inputName = el.query(By.css('#name'));
    const inputEmail = el.query(By.css('#email'));
    const inputValid = el.query(By.css('#emailv'));
    const name = 'John Doe !';
    const email = 'foo@bar.com';
    const valid = 'foo@bar.com';

    /* When  */
    inputName.triggerEventHandler('input', {target: { value: name }});
    inputEmail.triggerEventHandler('input', {target: { value: email }});
    inputValid.triggerEventHandler('input', {target: { value: valid }});

    /* Then  */
    fixture.whenStable().then(() => {
      expect(component.form.value.details).toEqual({name, email, valid});
    });
  }));

  it('should be invalid if name is missing', async(() => {
    /* Given */
    const inputName = el.query(By.css('#name'));

    /* When  */
    inputName.triggerEventHandler('input', {target: { value: 'f' }});
    inputName.triggerEventHandler('blur', null);
    inputName.triggerEventHandler('input', {target: { value: '' }});
    inputName.triggerEventHandler('blur', null);
    fixture.detectChanges();

    /* Then  */
    fixture.whenStable().then(() => {
      const error = el.query(By.css('.details label[for="name"] .error'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.textContent).toEqual('Field is required');
    });
  }));

  it('should be invalid if email is missing', async(() => {
    /* Given */
    const inputEmail = el.query(By.css('#email'));

    /* When  */
    inputEmail.triggerEventHandler('input', {target: { value: 'f' }});
    inputEmail.triggerEventHandler('blur', null);
    inputEmail.triggerEventHandler('input', {target: { value: '' }});
    inputEmail.triggerEventHandler('blur', null);
    fixture.detectChanges();

    /* Then  */
    fixture.whenStable().then(() => {
      const error = el.query(By.css('.details label[for="email"] .error'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.textContent).toEqual('Field is required');
    });
  }));

  it('should be invalid if validation email is missing', async(() => {
    /* Given */
    const inputValid = el.query(By.css('#emailv'));

    /* When  */
    inputValid.triggerEventHandler('input', {target: { value: 'f' }});
    inputValid.triggerEventHandler('blur', null);
    inputValid.triggerEventHandler('input', {target: { value: '' }});
    inputValid.triggerEventHandler('blur', null);
    fixture.detectChanges();

    /* Then  */
    fixture.whenStable().then(() => {
      let error = el.query(By.css('.details label[for="emailv"] .error span'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.textContent).toEqual('Field is required');
    });
  }));

  it('should be invalid if email and validation email are different', async(() => {
    /* Given */
    const inputEmail = el.query(By.css('#email'));
    const inputValid = el.query(By.css('#emailv'));

    /* When  */
    inputEmail.triggerEventHandler('input', {target: { value: 'angul@r.io' }});
    inputEmail.triggerEventHandler('blur', null);
    inputValid.triggerEventHandler('input', {target: { value: 'angul@r.com' }});
    inputValid.triggerEventHandler('blur', null);
    fixture.detectChanges();

    /* Then  */
    fixture.whenStable().then(() => {
      let error = el.query(By.css('.details label[for="emailv"] .error span'));
      expect(error).not.toBeNull();
      expect(error.nativeElement.textContent).toEqual('Emails mismatch');
    });
  }));



});
