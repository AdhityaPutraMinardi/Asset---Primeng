import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AssetTypeEnum } from "../../../constant/asset-type-code.constant";
import { CheckOutType } from "../../../constant/checkout-type.constant";
import { AssetResDto } from "../../../dto/asset/asset.res.dto";
import { EmployeeResDto } from "../../../dto/employee/employee.res.dto";
import { AssetService } from "../../../service/asset.service";
import { CheckOutService } from "../../../service/checkout.service";
import { EmployeeService } from "../../../service/employee.service";


@Component({
    selector: 'checkout-create',
    templateUrl: './checkout-create.component.html'
})
export class CheckOutCreateComponent implements OnInit {
    assetId: number | null[] = []
    returnDate: string | null[] = []
    checkInDate: string | null[] = []
    checkOutDetailReq = this.fb.group({
        assetId: [undefined],
        returnDate: [undefined],
        checkInDate: [undefined]
    })
    checkOutReqDto = this.fb.group({
        checkOutReq: this.fb.group({
            employeeId: [undefined],
            assetGeneralId: [undefined],
            place: [undefined]

        }),
        checkOutDetailReqDto: this.fb.array([])
    })
    employee!: EmployeeResDto[];
    assetGeneral!: AssetResDto[];
    asset!: AssetResDto[];
    checkOutType!: string;
    type1!: string;
    type2!: string;
    constructor(private fb: NonNullableFormBuilder,
        private checkOutService: CheckOutService,
        private router: Router,
        private assetService: AssetService,
        private employeeService: EmployeeService
    ) { }

    get detailReq() {
        return this.checkOutReqDto.get(`checkOutDetailReqDto`) as FormArray;
    }

    ngOnInit(): void {
        this.employeeService.getAll().subscribe(result => {
            this.employee = result;
        });

    }
    onAdd() {
        this.detailReq.push(this.fb.group({
            assetId: [null],
            returnDate: [],
            checkInDate: []
        }));
    }

    remove(i: number) {
        this.detailReq.removeAt(i);
    }
    onChange(event: any) {
        this.checkOutType = (event.target as HTMLSelectElement).value;
        this.getAsset();
    }

    onSubmit(): void {
        const data = this.checkOutReqDto.getRawValue();
        this.checkOutService.create(data).subscribe(result => {
            this.router.navigateByUrl('/checkout');
        })
    }
    get isEmployee() {

        return this.checkOutType == CheckOutType.EMPLOYEE;
    }

    get isAssetGeneral() {

        return this.checkOutType == CheckOutType.ASSET_GENERAL;
    }

    get isPlace() {

        return this.checkOutType == CheckOutType.PLACE;
    }

    getAsset() {
        if (this.isEmployee || this.isPlace) {
            this.type1 = AssetTypeEnum.ASSET_GENERAL;
            this.type2 = AssetTypeEnum.CONSUMABLES;
            this.assetService.getAll(this.type1, this.type2).subscribe(result => {
                this.asset = result;
            })
        } else {
            this.type1 = AssetTypeEnum.ASSET_GENERAL;
            this.assetService.getAll(this.type1).subscribe(result => {
                this.assetGeneral = result;
            });
            this.type1 = AssetTypeEnum.COMPONENT;
            this.type2 = AssetTypeEnum.LICENSES;
            this.assetService.getAll(this.type1, this.type2).subscribe(result => {
                this.asset = result;
            });
        }
    }


}