import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AssetStatusResDto } from "../../../dto/asset-status/asset-status.res.dto";
import { AssetTypeResDto } from "../../../dto/asset-type/asset-type.res.dto";
import { AssetService } from "../../../service/asset.service";


@Component({
    selector : 'asset-update',
    templateUrl : './asset-update.component.html'
})


export class AssetUpdateComponent implements OnInit{
    assetType!: AssetTypeResDto[];
    assetStatus!: AssetStatusResDto[];
    assetUpdateReqDto = this.fb.group({
        id : [],
        userId : [],
        assetTypeId: [],
        assetStatusId: [],
        fileName: [''],
        fileExt: ['']
    });
    constructor(private assetService: AssetService,
        private fb: NonNullableFormBuilder,
        private router : Router,
        private activated : ActivatedRoute) { }
    ngOnInit(): void {
        this.assetService.getStatus().subscribe(result => {
            this.assetStatus = result;
        })
        this.assetService.getType().subscribe(result => {
            this.assetType = result;
        })
        this.activated.params.subscribe(params =>{
            this.assetUpdateReqDto.patchValue({
                id : params['id']
            })
        })
    }

    onSubmit(){
        const data = this.assetUpdateReqDto.getRawValue();
        this.assetService.update(data).subscribe(result => {
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
    
            this.assetUpdateReqDto.patchValue({
              fileName: resultBase64,
              fileExt: resultExtension
            })
    
           
          })
        }
      }
}