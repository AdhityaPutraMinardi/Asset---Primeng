import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InvoiceDetailResDto } from "../../../dto/invoice-detail/invoice-detail.res.dto";
import { InvoiceService } from "../../../service/invoice.service";
import { NonNullableFormBuilder } from "@angular/forms";
import { ProviderResDto } from "../../../dto/provider/provider.res.dto";
import { ProviderService } from "../../../service/provider.service";

@Component({
    selector: 'detail-list',
    templateUrl: './detail-list.component.html'
})

export class DetailListComponent implements OnInit {
    invoicesDetails!: InvoiceDetailResDto[];
    code!: string;
    provider! : ProviderResDto[]
    invoiceDetailUpdateReqDto = this.fb.group({
        id : [0],
        assetName : [''],
        providerId : []
    })
    constructor(private invoiceService: InvoiceService,
        private route: ActivatedRoute,
        private fb : NonNullableFormBuilder,
        private providerService : ProviderService) { }
    ngOnInit(): void {
            this.getDetails();
        this.providerService.getAll().subscribe(result =>{
            this.provider = result;
        })
    }
    getDetails(){
        this.route.params
        .subscribe(params => {
            this.code = params['code'];
            this.invoiceService.getDetailByCode(params['code']).subscribe(result => {
                this.invoicesDetails = result;
            })
        }
        );
    }
    onUpdate(): void {
        const data = this.invoiceDetailUpdateReqDto.getRawValue();
        this.invoiceService.updateInvoiceDetail(data).subscribe(result => {
            this.getDetails();
        })
    }
    updateClick(detailId: number) {
        this.invoiceDetailUpdateReqDto.patchValue({
            id: detailId
        })
    }



}

