import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlavorService } from './shared/flavor/flavor.service';
import { AppRoutesModules } from './app.routes';
import { FlavorsComponent } from './flavors/flavors.component';

@NgModule({
  declarations: [
    AppComponent,
    FlavorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutesModules
  ],
  providers: [FlavorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
