import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CheckOutDetailResDto } from "../../../dto/checkout-detail/checkout-detail.res.dto";
import { CheckOutService } from "../../../service/checkout.service";

@Component({
    selector : 'detail-list',
    templateUrl : './detail-list.component.html'
})
export class CheckOutDetailListComponent implements OnInit{

    checkOutDetails! : CheckOutDetailResDto[];
    constructor(private checkOutService : CheckOutService,
        private activated : ActivatedRoute){}
    id! : number;
    ngOnInit(): void {
        this.activated.params.subscribe(params=>{
           this.id = params['id'];
           this.checkOutService.getCheckOut(params['id']).subscribe(result=>{
            this.checkOutDetails = result;
           })
        })
        
    }

}