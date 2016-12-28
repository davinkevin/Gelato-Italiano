/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IceCreamFlavorsComponent } from './ice-cream-flavors.component';
import Spy = jasmine.Spy;
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

describe('IceCreamFlavorsComponent', () => {
  let component: IceCreamFlavorsComponent;
  let fixture: ComponentFixture<IceCreamFlavorsComponent>;
  let el: DebugElement;

  let onModelChange: Function, onTouch: Function;
  let flavors = [
    {
      "title": "Amarena",
      "name": "Amarena",
      "description": "Ce parfum associe la crème onctueuse à la délicate saveur de l’Amarena. Il développe de délicieuses tonalités printanières et estivales.",
      "cover": "assets/img/flavor/amarena.jpg"
    }, {
      "title": "Agrumes Bio de Sicile",
      "name": "Agrumes",
      "description": "Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur",
      "cover": "assets/img/flavor/agrumi.jpg"
    }, {
      "title": "Banane du Brésil",
      "name": "Banane",
      "description": "Parée d’une magnifique couleur jaune, notre Banane est cueillie à maturité, parfumée à souhait. Un délicat sorbet qui associe douceur et exotisme",
      "cover": "assets/img/flavor/banana.jpg"
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceCreamFlavorsComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: Observable.of({flavors}) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCreamFlavorsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.writeValue([]);

    fixture.autoDetectChanges();
  });

  beforeEach(() => {
    onModelChange = jasmine.createSpy('onModelChange');
    onTouch = jasmine.createSpy('onTouch');

    component.registerOnChange(onModelChange);
    component.registerOnTouched(onTouch);
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  function getTitle(flavorsInput: DebugElement[]) {
    return flavorsInput
        .map(e => e.query(By.css('.title')))
        .map(e => e.nativeElement.textContent.trim());
  }

  it('should have as much flavor as route provide in the form', () => {
    /* Given */

    /* When  */
    const flavorsInput = el.queryAll(By.css('label'));

    /* Then  */
    expect(flavorsInput.length).toBe(3);
    expect(getTitle(flavorsInput)).toEqual(flavors.map(f => f.name));
  });

  it('should be able to do multi choice', async(() => {
    /* Given */
    const amarena = el.queryAll(By.css('label'))[0];
    const banane = el.queryAll(By.css('label'))[2];

    /* When  */
    amarena.nativeElement.click();
    banane.nativeElement.click();

    /* Then  */
    fixture.whenStable().then(() => {
      expect(component.value).toEqual([flavors[0], flavors[2]]);
    });
  }));

  it('should be able to deselect element by clicking it again', async(() => {
    /* Given */
    const amarena = el.queryAll(By.css('label'))[0];
    const banane = el.queryAll(By.css('label'))[2];

    /* When  */
    amarena.nativeElement.click();
    banane.nativeElement.click();
    amarena.nativeElement.click();

    /* Then  */
    fixture.whenStable().then(() => {
      expect(component.value).toEqual([flavors[2]]);
    });
  }));

  it('should react to blur event', async(() => {
    /* Given */
    const amarena = el.queryAll(By.css('label input'))[0];
    component.focused = 'foo';

    /* When  */
    amarena.triggerEventHandler('blur', null);

    /* Then  */
    fixture.whenStable().then(() => {
      expect(component.focused).toBeNull();
    });
  }));

  it('should react to focus event', async(() => {
    /* Given */
    const amarena = el.queryAll(By.css('label input'))[0];
    component.focused = 'foo';

    /* When  */
    amarena.triggerEventHandler('focus', null);

    /* Then  */
    fixture.whenStable().then(() => {
      expect(component.focused).toEqual(flavors[0]);
      expect(onTouch).toHaveBeenCalled();
    });
  }));

});
