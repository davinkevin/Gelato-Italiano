import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from './order.component';
import {FlavorsResolver} from '../shared/resolver/flavors/flavors.resolver';

const routes: Routes = [
    {
        path : 'order',
        component : OrderComponent,
        resolve: { flavors: FlavorsResolver }
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class OrderRoutesModule {}
