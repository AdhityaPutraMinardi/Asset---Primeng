
import { Component, OnInit } from "@angular/core";
import {  NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { InvoiceResDto } from "../../../dto/invoice/invoice.res.dto";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { InvoiceService } from "../../../service/invoice.service";
import { SupplierService } from "../../../service/supplier.service";
@Component({
    selector: 'invoice-list',
    templateUrl: './invoice-list.component.html'
})

export class InvoiceListComponent implements OnInit {
    invoices!: InvoiceResDto[];
    invoiceUpdateReqDto = this.fb.group({
        id: [0],
        financeId: [],
        supplierId: [],
        fileName: [''],
        fileExt: ['']
    })
    supplier! : SupplierResDto[];
    constructor(private invoiceService: InvoiceService,
        private router: Router, 
        private fb: NonNullableFormBuilder,
        private supplierService : SupplierService) { }
    ngOnInit(): void {
        this.getInvoice();
        this.supplierService.getAll().subscribe(result =>{
            this.supplier = result;
        })

    }
    getInvoice() {
        this.invoiceService.getAll().subscribe(result => {
            this.invoices = result;
        })
    }

    onClick(code: string) {
        this.router.navigateByUrl(`/invoice/detail/${code}`)

    }
    onUpdate(): void {
        const data = this.invoiceUpdateReqDto.getRawValue();
        this.invoiceService.updateInvoice(data).subscribe(result => {
            this.getInvoice();
        })
    }
    updateClick(invoiceId: number) {
        this.invoiceUpdateReqDto.patchValue({
            id: invoiceId
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
         
            this.invoiceUpdateReqDto.patchValue({
                fileName : resultBase64,
                fileExt : resultExtension
            })
          })
        }
      }


}