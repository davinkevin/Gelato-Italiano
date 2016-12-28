/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IceCreamSizeComponent } from './ice-cream-size.component';

describe('IceCreamSizeComponent', () => {

  let component: IceCreamSizeComponent;
  let fixture: ComponentFixture<IceCreamSizeComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceCreamSizeComponent ]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceCreamSizeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 sizes with 3 images', async(() => {
    let [large, medium, small] = el.queryAll(By.css('.ice-cream-size-label'));

    expect(getImgSrc(large)).toEqual('assets/img/format/cone_large.png');
    expect(getLabelText(large)).toEqual('Large');

    expect(getImgSrc(medium)).toEqual('assets/img/format/cone_medium.png');
    expect(getLabelText(medium)).toEqual('Medium');

    expect(getImgSrc(small)).toEqual('assets/img/format/cone_small.png');
    expect(getLabelText(small)).toEqual('Small');
  }));

  function getImgSrc(label: DebugElement): string {
    return (<any> label.query(By.css('img')).properties).src;
  }

  function getLabelText(label: DebugElement): string {
    return label.nativeElement.textContent.trim();
  }

  describe('ControlValueAccessor', () => {

    let onModelChange: Function, onTouch: Function;

    beforeEach(() => {
      onModelChange = jasmine.createSpy('onModelChange');
      onTouch = jasmine.createSpy('onTouch');

      component.registerOnChange(onModelChange);
      component.registerOnTouched(onTouch);
    });

    it('should select large cone', async(() => {
      /* Given */
      let large = el.query(By.css('input[value="large"]'));

      /* When  */
      large.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(large.properties['checked']).toBeTruthy();
        expect(component.value).toEqual('large');
        expect(onModelChange).toHaveBeenCalled();
      });

    }));

    it('should select medium cone', async(() => {
      /* Given */
      let medium = el.query(By.css('input[value="medium"]'));

      /* When  */
      medium.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(medium.properties['checked']).toBeTruthy();
        expect(component.value).toEqual('medium');
        expect(onModelChange).toHaveBeenCalled();
      });

    }));

    it('should select small cone', async(() => {
      /* Given */
      let small = el.query(By.css('input[value="small"]'));

      /* When  */
      small.nativeElement.click();

      /* Then  */
      fixture.whenStable().then(() => {
        expect(small.properties['checked']).toBeTruthy();
        expect(component.value).toEqual('small');
        expect(onModelChange).toHaveBeenCalled();
      });

    }));

    it('should update touch status if focus', async(() => {
      /* Given */
      let large = el.query(By.css('input[value="large"]'));

      /* When  */
      large.triggerEventHandler('focus', null);

      /* Then  */
      fixture.whenStable().then(() => {
        expect(onTouch).toHaveBeenCalled();
      });

    }));

    it('should be able to react to blur', async(() => {
      /* Given */
      let large = el.query(By.css('input[value="large"]'));

      /* When  */
      large.triggerEventHandler('blur', null);

      /* Then  */
      fixture.whenStable().then(() => {
        expect(component.focused).toEqual('');
      });
    }));

    it('should be able to write value', async(() => {
      /* Given */
      /* When  */
      component.writeValue('large');

      /* Then  */
      expect(component.value).toEqual('large');
    }));

  });

});
