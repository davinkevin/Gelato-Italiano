import { Component, OnInit } from '@angular/core';
import {Flavor, FlavorService} from '../shared/flavor/flavor.service';

@Component({
  selector: 'gi-flavors',
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.scss']
})
export class FlavorsComponent implements OnInit {

  flavors: Flavor[];

  constructor(private flavorService: FlavorService) {}

  ngOnInit(): void {
    this.flavorService
        .getFlavors()
        .subscribe(f => this.flavors = f);
  }

}
