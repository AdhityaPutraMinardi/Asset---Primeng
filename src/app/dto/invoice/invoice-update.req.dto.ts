export interface InvoiceUpdateReqDto {
    id : number;
    financeId: number;
    supplierId: number;
    fileName: string;
    fileExt: string;
}