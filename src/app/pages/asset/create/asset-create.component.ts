import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AssetStatusResDto } from "../../../dto/asset-status/asset-status.res.dto";
import { AssetTypeResDto } from "../../../dto/asset-type/asset-type.res.dto";
import { InvoiceDetailResDto } from "../../../dto/invoice-detail/invoice-detail.res.dto";
import { AssetService } from "../../../service/asset.service";
import { InvoiceService } from "../../../service/invoice.service";

@Component({
    selector: 'asset-create',
    templateUrl: './asset-create.component.html'
})


export class AssetCreateComponent {

    unassignedItem!: InvoiceDetailResDto[];
    assetType!: AssetTypeResDto[];
    assetStatus!: AssetStatusResDto[];

    assetReqDto = this.fb.group({
        assetTypeId: [],
        assetStatusId: [],
        invoiceAssetDetail: [],
        fileName: [''],
        fileExt: ['']

    })
    constructor(private assetService: AssetService
        , private invoiceService: InvoiceService,
        private fb: NonNullableFormBuilder,
        private router: Router) { }
    ngOnInit(): void {

        this.invoiceService.getUnassigned().subscribe(result => {
            this.unassignedItem = result;
        })
        this.assetService.getStatus().subscribe(result => {
            this.assetStatus = result;
        })
        this.assetService.getType().subscribe(result => {
            this.assetType = result;
        })
    }

    onSubmit(): void {
        const data = this.assetReqDto.getRawValue();
        this.assetService.create(data).subscribe(result => {
            this.router.navigateByUrl('/assets')
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
    
            this.assetReqDto.patchValue({
              fileName: resultBase64,
              fileExt: resultExtension
            })
          })
        }
      }
}