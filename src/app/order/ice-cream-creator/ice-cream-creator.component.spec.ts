/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { IceCreamCreatorComponent } from './ice-cream-creator.component';
import {PriceService} from "../../shared/service/price/price.service";
import {FormsModule, ReactiveFormsModule, FormArray, Validators} from "@angular/forms";
import {fstat} from "fs";

describe('IceCreamCreatorComponent', () => {
  let component: IceCreamCreatorComponent;
  let fixture: ComponentFixture<IceCreamCreatorComponent>;
  let el: DebugElement;

  let priceService: PriceService;
  beforeEach(() => {
    priceService = jasmine.createSpyObj('priceService', ['priceOf']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ IceCreamCreatorComponent ],
      providers: [ { provide: PriceService, useValue: priceService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.overrideComponent(IceCreamCreatorComponent, {
      set: {
        template: `
<div class="title">
    <h4>Create your Ice-Cream(s) </h4>
</div>

<div class="ice-cream-chooser" [formGroup]="currentIceCream">

    <h5>Select the size <span class="required">*</span></h5>

    <h5>Choose flavor(s)</h5>

    <div class="add-to-basket">

        <button class="btn" (click)="addIceCream()"
            [disabled]="currentIceCream.invalid"
            >
            <i class="glyphicon glyphicon-plus"></i> Add new Ice-Cream
        </button>

    </div>
</div>

<div *ngFor="let iceCream of iceCreams.controls; let i = index;">
    <div class="ice-cream-header">
        Ice-Cream {{ i + 1}}

        <i class="glyphicon ice-cream-status"
           [class.glyphicon-ok]="iceCream.valid"
           [class.glyphicon-remove]="iceCream.invalid"></i>

        <div class="pull-right">
            <span class="ice-cream-price"> {{ priceOf(iceCream.value.size) }} </span>

            <div *ngIf="iceCreams.controls.length > 1"
                 class="ice-cream-delete"
                 (click)="removeIceCream(i)">
                <i class="glyphicon glyphicon-trash"></i>
            </div>
        </div>


    </div>
</div>`
      }
    }).createComponent(IceCreamCreatorComponent);

    component = fixture.componentInstance;
    component.iceCreams = new FormArray([], Validators.minLength(1));

    el = fixture.debugElement;

    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not being able to add an ice-cream without flavors', async(() => {
    /* Given */
    let button = el.query(By.css('button'));

    /* When initialised */

    /* Then  */
    fixture.whenStable().then(() => {
      expect(button.properties['disabled']).toBeTruthy();
    })

  }));

  it('should be able to add a valid ice cream', async(() => {
    /* Given */
    let button = el.query(By.css('button'));

    /* When  */
    component.currentIceCream.patchValue({flavors: [{
      'title': 'Agrumes Bio de Sicile',
      'description': 'Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur',
      'cover': 'assets/img/flavor/agrumi.jpg'
    }]});
    fixture.detectChanges();

    /* Then  */
    fixture.whenStable().then(() => {
      expect(button.properties['disabled']).toBeFalsy();
    })
  }));

  describe('when ice-cream has been added', () => {

    let addButton: DebugElement;

    beforeEach(() => {
      addButton = el.query(By.css('button'));
      /* When  */
      component.currentIceCream.patchValue({flavors: [{
        'title': 'Agrumes Bio de Sicile',
        'description': 'Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur',
        'cover': 'assets/img/flavor/agrumi.jpg'
      }]});
      fixture.detectChanges();

      addButton.nativeElement.click();
    });

    it('should already have one ice-cream added', async(() => {
      expect(el.queryAll(By.css('.ice-cream-header')).length).toBe(1);
    }));

    it('should be able to add another ice cream', async(() => {
      /* Given */
      /* When  */
      component.currentIceCream.patchValue({flavors: [{
        'title': 'Agrumes Bio de Sicile',
        'description': 'Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur',
        'cover': 'assets/img/flavor/agrumi.jpg'
      }]});
      fixture.detectChanges();
      addButton.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(el.queryAll(By.css('.ice-cream-header')).length).toBe(2);
        expect(el.queryAll(By.css('.ice-cream-delete')).length).toBe(2);
      });
    }));

    it('should not be able to remove the first and only present ice cream', async(() => {
      expect(el.queryAll(By.css('.ice-cream-delete')).length).toEqual(0);
    }));

    it('should be able to remove one of the ice cream if more than one present', async(() => {
      /* Given */
      component.currentIceCream.patchValue({flavors: [{
        'title': 'Agrumes Bio de Sicile',
        'description': 'Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur',
        'cover': 'assets/img/flavor/agrumi.jpg'
      }]});
      fixture.detectChanges();
      addButton.nativeElement.click();

      /* When  */
      el.queryAll(By.css('.ice-cream-delete'))[0].nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(el.queryAll(By.css('.ice-cream-header')).length).toBe(1);
      });
    }));
  });

});
