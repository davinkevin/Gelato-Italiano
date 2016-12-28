import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailMatcher} from './validators/email-matcher.validator';

@Component({
  selector: 'gi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      details: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        valid: ['', Validators.required]
      }, { validator: emailMatcher } )
    });
  }

}
