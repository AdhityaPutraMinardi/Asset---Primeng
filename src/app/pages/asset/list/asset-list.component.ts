import { Component, OnInit } from "@angular/core";
import { AssetStatusResDto } from "../../../dto/asset-status/asset-status.res.dto";
import { AssetTypeResDto } from "../../../dto/asset-type/asset-type.res.dto";
import { AssetResDto } from "../../../dto/asset/asset.res.dto";
import { InvoiceDetailResDto } from "../../../dto/invoice-detail/invoice-detail.res.dto";
import { AssetService } from "../../../service/asset.service";
import { InvoiceService } from "../../../service/invoice.service";
import { AuthService } from "../../../service/auth.service";
import { RoleEnum } from "../../../constant/role.constant";
import { NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'asset-list',
    templateUrl: './asset-list.component.html'
})


export class AssetListComponent implements OnInit {
    assets!: AssetResDto[];
    unassignedItem!: InvoiceDetailResDto[];
    assetType!: AssetTypeResDto[];
    assetStatus!: AssetStatusResDto[];
    type1!: string;
    type2!: string
    fileId!: number;
    role!: string;
    newStatus!: AssetResDto;
    assetUpdateStatusReqDto = this.fb.group({
        statusId: [],
        id: [0]

    })
    deleteId! : number;
    constructor(private assetService: AssetService,
        private invoiceService: InvoiceService,
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private router : Router) { }
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
        const profile = this.authService.getProfile();
        if (profile) {
            this.role = profile.roleName
        }
        this.getDataByRole();


    }


    clickPicture(id: number) {
        this.fileId = id;
    }

    get isHr() {
        return this.role == RoleEnum.HR
    }
    get isFinance() {

        return this.role == RoleEnum.FINANCE
    }
    get isSupport() {
        return this.role == RoleEnum.SUPPORT
    }

    getDataByRole() {
        if (this.isSupport) {
            this.assetService.getAssetSupport().subscribe(result => {
                this.assets = result;
            })
    
        } else if (this.isFinance) {
            this.assetService.getAssetFinance().subscribe(result => {
                this.assets = result;
            })
        
        }
        else {
            this.assetService.getAll(this.type1, this.type2).subscribe(result => {
                this.assets = result;
            })
        }
    }

    onClick(assetId: number) {
        this.assetUpdateStatusReqDto.patchValue({
            id: assetId
        })
        this.deleteId = assetId;

    }
    updateClick(assetId: number){
        
        this.deleteId = assetId;
        this.router.navigateByUrl(`/assets/update/${this.deleteId}`)

    }
    onDelete() : void{
        this.assetService.delete(this.deleteId).subscribe(result =>{
           this.getDataByRole();
        })
       }
    onUpdate() {
        const data = this.assetUpdateStatusReqDto.getRawValue();
        this.assetService.updateStatus(data).subscribe(result => {
            this.getDataByRole();
        })
    }
}