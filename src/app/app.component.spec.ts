/* tslint:disable:no-unused-variable */

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FlavorService} from './shared/flavor/flavor.service';
import {DebugElement} from '@angular/core';
import Spy = jasmine.Spy;
import {Observable} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  let flavorService: FlavorService;
  let flavors = [
    {
      'title': 'Amarena',
      'description': 'Ce parfum associe la crème onctueuse à la délicate saveur de l’Amarena',
      'cover': 'assets/img/flavor/amarena.jpg'
    },{
      'title': 'Agrumes Bio de Sicile',
      'description': 'Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur',
      'cover': 'assets/img/flavor/agrumi.jpg'
    }
  ];

  beforeEach(() => {
    flavorService = jasmine.createSpyObj('flavorService', ['getFlavors']);
    (flavorService.getFlavors as Spy).and.returnValue(Observable.of(flavors));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AppComponent],
      providers: [
        { provide: FlavorService, useValue: flavorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;

    fixture.autoDetectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have flavors from service`, async(() => {

    fixture.whenStable().then(() => {

      let elements = el.queryAll(By.css('section.flavors ul.flavors li'));

      expect(elements.length).toBe(2);
      expect(elements[0].query(By.css('.title')).nativeElement.textContent).toEqual(flavors[0].title);
      expect(elements[0].query(By.css('.desc')).nativeElement.textContent).toEqual(flavors[0].description);
      expect(elements[0].query(By.css('.cover img')).nativeElement.getAttribute('src')).toEqual(flavors[0].cover);

      expect(elements[1].query(By.css('.title')).nativeElement.textContent).toEqual(flavors[1].title);
      expect(elements[1].query(By.css('.desc')).nativeElement.textContent).toEqual(flavors[1].description);
      expect(elements[1].query(By.css('.cover img')).nativeElement.getAttribute('src')).toEqual(flavors[1].cover);
    });

  }));

  it(`should have name of author`, async(() => {
    expect(component.author).toEqual('Kevin');
  }));
});
