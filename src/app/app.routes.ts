/**
 * Created by kevin on 27/12/2016.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlavorsComponent } from './flavors/flavors.component';
import { FlavorsResolver } from './shared/resolver/flavors/flavors.resolver';

const routes: Routes = [
    {path : '', redirectTo : '/', pathMatch : 'full'},
    {
        path : '',
        component : FlavorsComponent,
        resolve: { flavors: FlavorsResolver }
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutesModules {}
