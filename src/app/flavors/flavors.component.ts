import { Component, OnInit } from '@angular/core';
import {Flavor} from '../shared/service/flavor/flavor.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'gi-flavors',
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.scss']
})
export class FlavorsComponent implements OnInit {

  flavors: Flavor[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
        .map(d => (<any> d).flavors)
        .subscribe(f => this.flavors = f);
  }

}
