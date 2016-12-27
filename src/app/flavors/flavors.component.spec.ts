/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import { FlavorsComponent } from './flavors.component';
import {Observable} from 'rxjs';
import {ActivatedRoute} from "@angular/router";

describe('FlavorsComponent', () => {
  let component: FlavorsComponent;
  let fixture: ComponentFixture<FlavorsComponent>;
  let el: DebugElement;

  let flavors = [
    {
      'title': 'Amarena', 'description': 'Ce parfum associe la crème onctueuse à la délicate saveur de l’Amarena',
      'cover': 'assets/img/flavor/amarena.jpg'
    }, {
      'title': 'Agrumes Bio de Sicile',
      'description': 'Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur',
      'cover': 'assets/img/flavor/agrumi.jpg'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: Observable.of({flavors}) } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorsComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create the FlavorsComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should have flavors from resolver`, async(() => {

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

});
