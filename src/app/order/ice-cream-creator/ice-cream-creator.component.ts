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
    currentIceCream: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private priceService: PriceService
    ) {}

    ngOnInit() {
        this.currentIceCream = this.generateIceCreamGroup();
    }

    priceOf(size: string): number {
        return this.priceService.priceOf(size);
    }

    addIceCream(): void {
        this.iceCreams.push(this.currentIceCream);
        this.currentIceCream = this.generateIceCreamGroup();
    }

    private generateIceCreamGroup(): FormGroup {
        return this.formBuilder.group({
            size: ['small', Validators.required],
            flavors: [[], Validators.required]
        });
    }

    removeIceCream(i: number) {
        this.iceCreams.removeAt(i);
    }

}
