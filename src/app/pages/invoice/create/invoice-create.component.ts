import { Component, OnInit } from "@angular/core";
import { FormArray, FormGroup, NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { InvoiceResDto } from "../../../dto/invoice/invoice.res.dto";
import { ProviderResDto } from "../../../dto/provider/provider.res.dto";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { InvoiceService } from "../../../service/invoice.service";
import { ProviderService } from "../../../service/provider.service";
import { SupplierService } from "../../../service/supplier.service";

@Component({
    selector: 'invoice-create',
    templateUrl: './invoice-create.component.html'
})

export class InvoiceCreateComponent implements OnInit {

    invoices!: InvoiceResDto[];
    suppliers!: SupplierResDto[];
    providers!: ProviderResDto[];
    detailReq = this.fb.group({
        assetName: [],
        providerId: [0]
    })
    invoiceDetailsReqDto = this.fb.group({
        invoiceReq: this.fb.group({
            supplierId: [0],
            fileName: [''],
            fileExt: [''],
        }),
        invoiceDetailReq: this.fb.array([
            this.detailReq
        ])
    })
    constructor(private fb: NonNullableFormBuilder,
        private invoiceService: InvoiceService,
        private router: Router,
        private supplierService: SupplierService,
        private providerService: ProviderService
    ) { }

    get invoiceReqDto() {
        return this.invoiceDetailsReqDto.get(`invoiceReq`) as FormGroup;
    }
    get invoiceDetailReq() {
        return this.invoiceDetailsReqDto.get(`invoiceDetailReq`) as FormArray;
    }
    get invoiceDetailReqDto() {
        return this.invoiceDetailReq.get(`detailReq`) as FormGroup;
    }

    ngOnInit(): void {
        this.invoiceService.getAll().subscribe(result => {
            this.invoices = result;
        })
        this.providerService.getAll().subscribe(result => {
            this.providers = result;
        })
        this.supplierService.getAll().subscribe(result => {
            this.suppliers = result;
        })
    }


    onAdd() {
        this.invoiceDetailReq.push(this.fb.group({
            assetName: '',
            providerId: 0
        }));
    }

    remove(i: number) {
        this.invoiceDetailReq.removeAt(i);
    }
    onSubmit(): void {
        const data = this.invoiceDetailsReqDto.getRawValue();
        this.invoiceService.create(data).subscribe(result => {
            this.router.navigateByUrl('/invoice');
        })
    }
    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.target.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.invoiceReqDto.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })


            })
        }
    }
}