import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormControlName, NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CheckOutResDto } from "../../../dto/checkout/checkout.res.dto";
import { CheckOutService } from "../../../service/checkout.service";
import { CheckOutDetailResDto } from "../../../dto/checkout-detail/checkout-detail.res.dto";

@Component({
    selector: 'checkin',
    templateUrl: './checkin.component.html'
})
export class CheckInComponent implements OnInit {

    checkInReqDto = this.fb.group({
        checkOutId: 0,
        checkIn: this.fb.array([
            0
        ])
    });
    checkOutDetail!: CheckOutDetailResDto[];
    checkOut!: CheckOutResDto[];
    constructor(private fb: NonNullableFormBuilder,
        private checkOutService: CheckOutService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.checkOutService.getAllCheckOut().subscribe(result => {
            this.checkOut = result;
        })
    }
    get checkInReq() {
        return this.checkInReqDto.get(`checkIn`) as FormArray


    }
    onAdd() {
        this.checkInReq.push(this.fb.control(0));
    }
    onRemove(i: number) {
        this.checkInReq.removeAt(i);
    }
    onChange() {
        const checkOutId = this.checkInReqDto.get(`checkOutId`)!.value;
        this.checkOutService.getAllDetail(checkOutId).subscribe(result => {
            this.checkOutDetail = result;
        })
    }
    onSubmit() {
        const data = this.checkInReqDto.getRawValue();
        this.checkOutService.checkIn(data).subscribe(() => {
            this.router.navigateByUrl('/checkout')
        });
    }
}