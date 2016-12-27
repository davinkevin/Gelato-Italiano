import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {FlavorService, Flavor} from '../../service/flavor/flavor.service';

@Injectable()
export class FlavorsResolver implements Resolve<any> {

  constructor(private flavorService: FlavorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Flavor[]> {
    return this.flavorService.getFlavors();
  }


}
