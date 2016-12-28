import {Flavor} from '../../shared/service/flavor/flavor.service';

export interface IceCream {
    size: 'small'|'large'|'medium';
    flavors: Flavor[];
}
