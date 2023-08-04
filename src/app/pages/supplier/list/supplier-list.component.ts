import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { SupplierService } from "../../../service/supplier.service";

@Component({
    selector: 'supplier',
    templateUrl: './supplier-list.component.html'

})

export class SupplierComponent implements OnInit {

    suppliers!: SupplierResDto[];
    supplier! : null | SupplierResDto;
    supplierReqDto = this.fb.group({
        supplierName: [null],
        fileName: [''],
        fileExt: ['']
    })
    supplierUpdateReqDto = this.fb.group({
        id: [0],
        supplierName: [],
        fileName: [''],
        fileExt: ['']
    })
    deleteId!: number;
    constructor(private supplierService: SupplierService,
        private fb: NonNullableFormBuilder) { }

    ngOnInit(): void {
        this.getSupplier();
    }

    getSupplier() {
        this.supplierService.getAll().subscribe(result => {
            this.suppliers = result;
        })
    }
    onClick(supplierId: number): void {
        this.supplierUpdateReqDto.patchValue({
            id: supplierId
        })
        for(let i = 0 ; i < this.suppliers.length ; i++){
            if(this.suppliers[i].id == supplierId){
                this.supplier = this.suppliers[i];
            }
        }
        this.deleteId = supplierId;
    }

    onUpdate(): void {
        const data = this.supplierUpdateReqDto.getRawValue();
        this.supplierService.update(data).subscribe(result => {
            this.getSupplier();
        })
    }

    onDelete(): void {
        this.supplierService.delete(this.deleteId).subscribe(result => {
            this.getSupplier();
        })
    }
    onSubmit(): void {
        const data = this.supplierReqDto.getRawValue();
        this.supplierService.create(data).subscribe(result => {
            this.getSupplier()
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

                this.supplierReqDto.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })
                this.supplierUpdateReqDto.patchValue({
                    fileName: resultBase64,
                    fileExt: resultExtension
                })

            })
        }
    }
}