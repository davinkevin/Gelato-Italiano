import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutesModules } from './app.routes';
import { FlavorsComponent } from './flavors/flavors.component';
import {SharedModule} from './shared/shared.module';
import {OrderModule} from './order/order.module';

@NgModule({
  declarations: [
    AppComponent,
    FlavorsComponent
  ],
  imports: [
    /* Main */      BrowserModule, FormsModule, HttpModule,
    /* Routes */    AppRoutesModules,
    /* Shared */    SharedModule,
    /* Features */  OrderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
