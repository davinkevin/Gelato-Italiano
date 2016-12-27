import {Component, OnInit} from '@angular/core';
import {FlavorService, Flavor} from './shared/flavor/flavor.service';

@Component({
  selector: 'gi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private flavors: Flavor[];
  author: string = 'Kevin';

  constructor(private flavorService: FlavorService) {}

  ngOnInit(): void {
    this.flavorService.getFlavors()
        .subscribe(f => this.flavors = f);
  }
}
