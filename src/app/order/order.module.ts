import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from './order.component';
import {OrderRoutesModule} from './order.routes';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [OrderComponent]
})
export class OrderModule {}
