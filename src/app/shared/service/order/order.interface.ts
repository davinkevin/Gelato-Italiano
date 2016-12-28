import {IceCream} from '../../../order/ice-cream-creator/ice-cream.interface';
/**
 * Created by kevin on 28/12/2016.
 */

export interface Order {
    details: {
        name: string;
        email: string;
    };
    iceCreams: IceCream[];
    id?: number;
}
