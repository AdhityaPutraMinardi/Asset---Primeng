import { CheckOutReqDto } from "../checkout/checkout.req.dto";
import { CheckOutDetailReqDto } from "./checkout-detail.req.dto";

export interface CheckOutDetailReqListDto{
    checkOutDetailReqDto :  (CheckOutDetailReqDto|unknown) [] ;
    checkOutReq? : CheckOutReqDto;
}