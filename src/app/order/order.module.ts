import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from './order.component';
import {OrderRoutesModule} from './order.routes';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { IceCreamCreatorComponent } from './ice-cream-creator/ice-cream-creator.component';
import { IceCreamSizeComponent } from './ice-cream-creator/size/ice-cream-size.component';
import { IceCreamFlavorsComponent } from './ice-cream-creator/flavors/ice-cream-flavors.component';
import { PriceCalculatorComponent } from './price-calculator/price-calculator.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [OrderComponent, IceCreamCreatorComponent, IceCreamSizeComponent, IceCreamFlavorsComponent, PriceCalculatorComponent]
})
export class OrderModule {}
