import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { CheckOutResDto } from "../../../dto/checkout/checkout.res.dto";
import { CheckOutService } from "../../../service/checkout.service";

@Component({
    selector : 'checkout-list',
    templateUrl : './checkout-list.component.html'
})
export class CheckOutListComponent implements OnInit{
    checkOut! : CheckOutResDto[];
    checkOutReqDto = this.fb.group({

    })
    constructor(private checkOutService : CheckOutService,
        private fb : NonNullableFormBuilder,
        private router : Router){}

        ngOnInit(): void {
            this.checkOutService.getAllCheckOut().subscribe(result =>{
                this.checkOut = result;
            })
        }

        onClick(id : number){
            this.router.navigateByUrl(`/checkout/detail/${id}`);
        }   
}