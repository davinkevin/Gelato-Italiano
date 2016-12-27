/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FlavorService} from './shared/flavor/flavor.service';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import Spy = jasmine.Spy;
import {Observable} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.autoDetectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have name of author in the comp and in the page`, async(() => {
    expect(component.author).toEqual('Kevin');
    expect(el.query(By.css('footer p')).nativeElement.textContent).toContain('Kevin');
  }));
});
