/**
 * Created by kevin on 27/12/2016.
 */

import {NgModule} from '@angular/core';
import {FlavorService} from './service/flavor/flavor.service';
import {FlavorsResolver} from './resolver/flavors/flavors.resolver';
import {PriceService} from './service/price/price.service';
import {OrderService} from './service/order/order.service';

@NgModule({
    providers: [
        FlavorService, FlavorsResolver,
        PriceService, OrderService
    ]
})
export class SharedModule {}
