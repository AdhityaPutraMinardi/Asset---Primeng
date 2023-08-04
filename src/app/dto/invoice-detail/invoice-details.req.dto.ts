import { InvoiceReqDto } from "../invoice/invoice.req.dto";
import { InvoiceDetailReqDto } from "./invoice-detail.req.dto";

export interface InvoiceDetailsReqDto{
    invoiceDetailReq : InvoiceDetailReqDto[];
    invoiceReq : InvoiceReqDto;
}