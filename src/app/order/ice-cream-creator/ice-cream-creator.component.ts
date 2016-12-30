import {Component, OnInit, Input} from '@angular/core';
import {FormArray, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PriceService} from '../../shared/service/price/price.service';

@Component({
    selector: 'gi-ice-cream-creator',
    templateUrl: './ice-cream-creator.component.html',
    styleUrls: ['./ice-cream-creator.component.scss']
})
export class IceCreamCreatorComponent implements OnInit {

    @Input() iceCreams: FormArray;
    iceCreamInEdition: number;

    constructor(private formBuilder: FormBuilder,
                private priceService: PriceService
    ) {}

    ngOnInit(): void {
        this.addIceCream();
    }

    priceOf(size: string): number {
        return this.priceService.priceOf(size);
    }

    addIceCream(): void {
        this.iceCreams.push(this.generateIceCreamGroup());
        this.iceCreamInEdition = this.iceCreams.length - 1;
    }

    private generateIceCreamGroup(): FormGroup {
        return this.formBuilder.group({
            size: ['small', Validators.required],
            flavors: [[], Validators.required]
        });
    }

    toggleIceCream(i: number): void {
        if (this.iceCreamInEdition === i) {
            this.iceCreamInEdition = null;
            return;
        }

        this.iceCreamInEdition = i;
    }

    removeIceCream(i: number): void {
        this.iceCreams.removeAt(i);
    }

}
