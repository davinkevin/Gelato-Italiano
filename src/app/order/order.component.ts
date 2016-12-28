import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailMatcher} from './validators/email-matcher.validator';
import {OrderService} from '../shared/service/order/order.service';

@Component({
  selector: 'gi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      details: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        valid: ['', Validators.required]
      }, { validator: emailMatcher } ),
    iceCreams: this.formBuilder.array([], Validators.minLength(1))
    });
  }

  onSubmit() {
    this.orderService
        .create(this.form.value)
        .subscribe(o => console.log(`Order saved with ID ${o.id}`))
    ;
  }

}
