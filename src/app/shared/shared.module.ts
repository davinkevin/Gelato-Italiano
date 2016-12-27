/**
 * Created by kevin on 27/12/2016.
 */

import {NgModule} from '@angular/core';
import {FlavorService} from './service/flavor/flavor.service';
import {FlavorsResolver} from './resolver/flavors/flavors.resolver';

@NgModule({
    providers: [
        FlavorService, FlavorsResolver
    ]
})
export class SharedModule {}
